import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mind API',
      version: '1.0.0',
      description: 'API de gerenciamento de posts e usuários',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            content: { type: 'string' },
            author_id: { type: 'string' },
            image_url: { type: 'string' },
            comments: {
              type: 'array',
              items: { $ref: '#/components/schemas/Comment' },
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            content: { type: 'string' },
            author: { type: 'string' },
            post_id: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            items: { type: 'array', items: {} },
            page: { type: 'integer' },
            page_size: { type: 'integer' },
            total: { type: 'integer' },
            total_pages: { type: 'integer' },
          },
        },
        CreateUser: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        CreatePost: {
          type: 'object',
          required: ['title', 'content', 'description'],
          properties: {
            title: { type: 'string', maxLength: 255 },
            content: { type: 'string' },
            description: { type: 'string', maxLength: 500 },
            image_base64: { type: 'string' },
          },
        },
        SignIn: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        UpdatePost: {
          type: 'object',
          properties: {
            title: { type: 'string', maxLength: 255 },
            content: { type: 'string' },
            description: { type: 'string', maxLength: 500 },
            image_base64: { type: 'string' },
          },
        },
        SuccessMessage: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/signin': {
        post: {
          tags: ['Auth'],
          summary: 'Autenticar usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SignIn' },
              },
            },
          },
          responses: {
            200: {
              description: 'Login realizado com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthResponse' },
                },
              },
            },
            401: {
              description: 'Credenciais inválidas',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/users': {
        post: {
          tags: ['Users'],
          summary: 'Criar novo usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateUser' },
              },
            },
          },
          responses: {
            201: { description: 'Usuário criado com sucesso' },
            400: {
              description: 'Dados inválidos',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/users/{id}': {
        put: {
          tags: ['Users'],
          summary: 'Atualizar usuário',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateUser' },
              },
            },
          },
          responses: {
            200: { description: 'Usuário atualizado com sucesso' },
            404: { description: 'Usuário não encontrado' },
          },
        },
      },
      '/users/profile': {
        get: {
          tags: ['Users'],
          summary: 'Obter perfil do usuário autenticado',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Perfil do usuário',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            401: { description: 'Não autenticado' },
          },
        },
      },
      '/posts': {
        post: {
          tags: ['Posts'],
          summary: 'Listar posts com paginação',
          description: 'Retorna uma lista paginada de posts. Utiliza POST para permitir filtros mais complexos.',
          parameters: [
            {
              name: 'page',
              in: 'query',
              schema: { type: 'integer', default: 1 },
            },
            {
              name: 'page_size',
              in: 'query',
              schema: { type: 'integer', default: 10 },
            },
            {
              name: 'search',
              in: 'query',
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Lista de posts paginada',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/Pagination' },
                      {
                        properties: {
                          items: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Post' },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      '/posts/create': {
        post: {
          tags: ['Posts'],
          summary: 'Criar novo post',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreatePost' },
              },
            },
          },
          responses: {
            201: {
              description: 'Post criado com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessMessage' },
                },
              },
            },
            401: { description: 'Não autenticado' },
          },
        },
      },
      '/posts/{id}': {
        put: {
          tags: ['Posts'],
          summary: 'Atualizar post',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID do post',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdatePost' },
              },
            },
          },
          responses: {
            200: {
              description: 'Post atualizado com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessMessage' },
                },
              },
            },
            401: { description: 'Não autenticado' },
            404: { description: 'Post não encontrado' },
          },
        },
        delete: {
          tags: ['Posts'],
          summary: 'Deletar post',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID do post',
            },
          ],
          responses: {
            200: {
              description: 'Post deletado com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessMessage' },
                },
              },
            },
            401: { description: 'Não autenticado' },
            404: { description: 'Post não encontrado' },
          },
        },
      },
    },
  },
  apis: [],
}

export const swaggerSpec = swaggerJsdoc(options)
