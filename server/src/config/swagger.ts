import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.4',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products',
      },
    ],
    info: {
      title: 'REST API Product Management - Node.js / Express / TypeScript ',
      version: '1.0.0',
      description: 'API Docs for Products',
    },
  },
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUIOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('/public/product-management-logo.png');
      heigh: 80px;
      width: 50px;
    }
    .swagger-ui .topbar {
      background-color: #1a2635;
    }
  `,
  customSiteTitle: 'Documentation REST API Product Management',
};

export default swaggerSpec;
export { swaggerUIOptions };
