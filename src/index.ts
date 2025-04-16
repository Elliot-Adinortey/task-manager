import config  from './config';
import logger  from './utils/logger';
import app from './app';


//validate environment variables


// Start the app listening

app.listen(config.port, () => {
  logger.logRequest(`Server is listening on port ${config.port}`);
});
