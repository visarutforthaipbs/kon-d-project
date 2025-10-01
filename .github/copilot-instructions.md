<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
  <!-- Ask for project type, language, and frameworks if not specified. Skip if already provided. -->

  Requirements clarified: Next.js 14 TypeScript project for "เสียงเยาวชนไทย" opinion survey with Chakra UI, MongoDB, word clouds.

- [x] Scaffold the Project
  <!--
  Ensure that the previous step has been marked as completed.
  Call project setup tool with projectType parameter.
  Run scaffolding command to create project files and folders.
  Use '.' as the working directory.
  If no appropriate projectType is available, search documentation using available tools.
  Otherwise, create the project structure manually using available file creation tools.
  -->

  Project scaffolded: Next.js 14 with TypeScript, complete directory structure, all components, API routes, database models, and configuration files created.

- [x] Customize the Project
  <!--
  Verify that all previous steps have been completed successfully and you have marked the step as completed.
  Develop a plan to modify codebase according to user requirements.
  Apply modifications using appropriate tools and user-provided references.
  Skip this step for "Hello World" projects.
  -->

  Project customized: All components implemented with Thai language support, word cloud visualization, MongoDB integration, and IP-based rate limiting.

- [x] Install Required Extensions
  <!-- ONLY install extensions provided mentioned in the get_project_setup_info. Skip this step otherwise and mark as completed. -->

  No additional extensions required beyond standard Next.js development setup.

- [x] Compile the Project
  <!--
  Verify that all previous steps have been completed.
  Install any missing dependencies.
  Run diagnostics and resolve any issues.
  Check for markdown files in project folder for relevant instructions on how to do this.
  -->

  Dependencies installed successfully. MongoDB connection configured with production credentials.

- [x] Create and Run Task
  <!--
  Verify that all previous steps have been completed.
  Check https://code.visualstudio.com/docs/debugtest/tasks to determine if the project needs a task. If so, use the create_and_run_task to create and launch a task based on package.json, README.md, and project structure.
  Skip this step otherwise.
   -->

  Development server launched via npm run dev.

- [x] Launch the Project
  <!--
  Verify that all previous steps have been completed.
  Prompt user for debug mode, launch only if confirmed.
   -->

  Application running at http://localhost:3000 with MongoDB Atlas connection established.

- [ ] Ensure Documentation is Complete
<!--
Verify that all previous steps have been completed.
Verify that README.md and the copilot-instructions.md file in the .github directory exists and contains current project information.
Clean up the copilot-instructions.md file in the .github directory by removing all HTML comments.
 -->
