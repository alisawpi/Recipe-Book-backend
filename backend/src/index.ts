import app from './app';
import config from './utils/config';
app.listen(config.PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Server running on port ${config.PORT}`);
});