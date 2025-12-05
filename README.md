# Conventions

The hashs in this project are hexadecimal format.

---

# APIs Documentation

Note: ?field = optional field.


The users API:

 Base URL: http://localhost:.../users/

 to get data:

   endpoint: base url/{user_id}

   request body (client): null

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

 to create user:

   endpoint: base url/

   request body (client): {name: string, email: string, password: string}

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

 to update user:

   request body: {?name: string, ?email: string, ?password: string}

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

 to delete user:

   request body: null

   server data: {id: int, created_at: bigint, updated_at: bigint, name: string, email: string}

