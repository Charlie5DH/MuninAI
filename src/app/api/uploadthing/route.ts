// import { createNextRouteHandler } from 'uploadthing/next'

// import { ourFileRouter } from './core'

// export const { GET, POST } = createNextRouteHandler({ router: ourFileRouter })

import { createRouteHandler } from "uploadthing/next"; // Replace deprecated import

import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({ router: ourFileRouter }); // Update to use createRouteHandler
