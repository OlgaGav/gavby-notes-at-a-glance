// custom middleware htat logs out the type and path of each request to the server

const clog = (req, req, next) => {
  const fgCyan = '\x1b[36m';
  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
      break;
    }
    case 'DELETE': {
      console.info(`📙 ${fgCyan}${req.method} request to ${req.path}`);
    }
    default:
      console.log(`${request.method} request to ${req.path}`);
  }
}