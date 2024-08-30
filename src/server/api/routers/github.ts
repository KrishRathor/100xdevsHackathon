import { error } from "console";
import { get } from "http";
import { Octokit } from "octokit";
import { string, z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const githubRouter = createTRPCRouter({
  addBounty: publicProcedure
    .input(z.object({
      repo: z.string(),
      ownerId: z.string(),
      issue: z.number(),
      amount: z.number(),
    }))
    .mutation(async opts => {
      try {

        console.log('here................');

        const { repo, ownerId, issue, amount } = opts.input;


        const getToken = await opts.ctx.prisma.account.findFirst({ where: { userId: ownerId } });
        const getUser = await opts.ctx.prisma.user.findFirst({ where: { id: ownerId } });

        if (!getToken || !getUser) {
          return {
            code: 200,
            message: 'Unauthorized',
            body: null
          }
        }

        const accessToken = getToken?.access_token;
        const owner = getUser.name;

        const createBounty = await prisma.bounty.create({
          data: {
            repo,
            issueNumber: issue.toString(),
            amount: amount.toString(),
            userId: getUser.id
          }
        })

        const octokit = new Octokit({
          auth: accessToken
        })

        await octokit.request(`POST /repos/${owner}/${repo}/issues/${issue}/comments`, {
          owner: owner,
          repo: repo,
          issue_number: issue,
          body: `This is autmoated comment by -- tool.  This is a bounty for ${amount}. Add 'claim #-${createBounty.id}' in your pull request message to claim bounty`,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })

        await octokit.request(`POST /repos/${owner}/${repo}/hooks`, {
          owner: owner,
          repo: repo,
          name: 'web',
          active: true,
          events: [
            'pull_request'
          ],
          config: {
            url: 'https://d851-103-100-7-95.ngrok-free.app/api/v1/pr',
            content_type: 'json',
            insecure_ssl: '0'
          },
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })


      } catch (error) {
        console.log(error);
      } finally {
        opts.ctx.prisma.$disconnect();
      }
    }),
  listenPR: publicProcedure
    .input(z.any())
    .mutation(async opts => {
      console.log(opts);
    }),
  getReposList: publicProcedure
    .input(z.object({
      owner: z.string()
    }))
    .mutation(async opts => {
      try {

        const { owner } = opts.input;

        const getToken = await opts.ctx.prisma.account.findFirst({ where: { userId: owner } });
        const getUser = await opts.ctx.prisma.user.findFirst({ where: { id: owner } });

        if (!getToken || !getUser) {
          return {
            code: 200,
            message: 'Unauthorized',
            body: null
          }
        }

        const accessToken = getToken.access_token;
        const username = getUser.name;

        const octokit = new Octokit({
          auth: accessToken
        })

        const response = await octokit.request(`GET /users/${username}/repos?per_page=1000`, {
          username: username,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })

        const name = response.data.map((r: any) => r.name);
        return {
          code: 200,
          message: 'got repos',
          body: name
        }

      } catch (erorr) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      }
    }),
  listIssuesInRepo: publicProcedure
    .input(z.object({
      owner: z.string(),
      repo: z.string()
    }))
    .mutation(async opts => {
      try {

        const { owner, repo } = opts.input;

        const getToken = await opts.ctx.prisma.account.findFirst({ where: { userId: owner } });
        const getUser = await opts.ctx.prisma.user.findFirst({ where: { id: owner } });

        if (!getToken || !getUser) {
          return {
            code: 200,
            message: 'Unauthorized',
            body: null
          }
        }

        const accessToken = getToken?.access_token;

        const octokit = new Octokit({
          auth: accessToken
        })

        const response = await octokit.request(`GET /repos/${getUser.name}/${repo}/issues`, {
          owner: getUser.name,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })

        const body = response.data.map((r: any) => {
          if (!r.pull_request) {
            return {
              title: r.title,
              number: r.number
            }
          }
        }).filter((r: any) => r !== undefined);



        console.log(response.data);

        return {
          code: 200,
          message: 'issues in repo',
          body
        }

      } catch (erorr) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      }
    }),
  listPRinIssues: publicProcedure
    .input(z.object({
      owner: z.string(),
      repo: z.string()
    }))
    .mutation(async opts => {
      try {

        console.log('till here =========>>>>>>>>>>>>>');


        const { owner, repo } = opts.input;

        const getToken = await opts.ctx.prisma.account.findFirst({ where: { userId: owner } });
        const getUser = await opts.ctx.prisma.user.findFirst({ where: { id: owner } });

        if (!getToken || !getUser) {
          return {
            code: 200,
            message: 'Unauthorized',
            body: null
          }
        }

        const accessToken = getToken?.access_token;

        const octokit = new Octokit({
          auth: accessToken
        })

        const response = await octokit.request(`GET /repos/${getUser.name}/${repo}/issues`, {
          owner: getUser.name,
          repo: repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })

        const body = response.data.map((r: any) => {
          if (r.pull_request) {
            return {
              title: r.title,
              number: r.number,
              body: r.body
            }
          }
        }).filter((r: any) => r !== undefined);

        console.log(response.data);

        return {
          code: 200,
          message: 'got pr',
          body
        }

      } catch (erorr) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      }
    }),
  registerUser: publicProcedure
    .input(z.object({
      username: z.string(),
      address: z.string()
    }))
    .mutation(async opts => {
      try {

        console.log('here')

        const { username, address } = opts.input;

        console.log(username, address);

        const createUser = await opts.ctx.prisma.solver.create({
          data: {
            githubUsername: username,
            publicAdress: address
          }
        })

        return {
          code: 200,
          message: 'created user',
          body: createUser
        }

      } catch (erorr) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      }
    }),
  getPr: publicProcedure
    .input(z.object({
      repo: z.string(),
      issue: z.string()
    }))
    .mutation(async opts => {

      try {

      } catch (erorr) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      } 1

    })
})
