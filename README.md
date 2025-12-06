# Conventions

The hashes and identifiers used in this project follow standard hexadecimal or integer formats.  
Middlewares must implement a `handle` method so they can be executed in sequence with a consistent interface.

---

# APIs Documentation

Note: ?field = optional field.

The users API:

 Base URL: http://localhost:{port}/users/

 to get data:

   endpoint: base url/{user_id}

   request body (client): null

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

 to create user:

   endpoint: base url/

   request body (client): {name: string, email: string, password: string}

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

 to update user:

   endpoint: base url/{user_id}

   request body: {?name: string, ?email: string, ?password: string}

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

 to delete user:

   endpoint: base url/{user_id}

   request body: null

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

---

The login API:

 Base URL: http://localhost:{port}/users/{user_id}/

 to login:

   endpoint: base url/login

   request body: null

   server data: user data + login status

 to logout:

   endpoint: base url/logout

   request body: null

   server data: user data + logout status

---

The tasks API:

 Base URL: http://localhost:{port}/users/{user_id}/tasks/

 to get all tasks:

   endpoint: base url/

   request body: null

   server data: array of tasks

 to get a task:

   endpoint: base url/{task_id}

   request body: null

   server data: task data

 to create task:

   endpoint: base url/

   request body: {content: string}

   server data: created task

 to update task:

   endpoint: base url/{task_id}

   request body: {content: string}

   server data: updated task

 to delete all tasks:

   endpoint: base url/

   request body: null

   server data: confirmation

 to delete a task:

   endpoint: base url/{task_id}

   request body: null

   server data: confirmation

---

# Response Format (common)

All endpoints return JSON in this structure:

 {
   message: string,
   success: boolean,
   data: any,
   code: number
 }

Where:
 - message: human-readable description
 - success: true/false
 - data: main returned content
 - code: status code
