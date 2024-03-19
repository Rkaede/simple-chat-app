const DEFAULT_AWS_REGION = 'us-east-1';

function getEnvOrDefault(key: string, altKey: string, defaultValue?: string) {
  return process.env[key] ?? process.env[altKey] ?? defaultValue;
}

function parseAWSCredentials() {
  // We support prefixing environment variables with APP_ for
  // deploying to AWS Amplify which reserves variables starting with
  // AWS_ for internal use.
  let awsRegion = getEnvOrDefault('AWS_REGION', 'APP_AWS_REGION', DEFAULT_AWS_REGION);
  let awsAccessKey = getEnvOrDefault('AWS_ACCESS_KEY_ID', 'APP_AWS_ACCESS_KEY_ID');
  let awsSecretKey = getEnvOrDefault('AWS_SECRET_ACCESS_KEY', 'APP_AWS_SECRET_ACCESS_KEY');

  // Use secrets if available
  if (typeof process.env.secrets === 'string') {
    try {
      const secrets = JSON.parse(process.env.secrets);

      awsRegion = secrets.awsRegion ?? awsRegion;
      awsAccessKey = secrets.awsAccessKey ?? awsAccessKey;
      awsSecretKey = secrets.awsSecretKey ?? awsSecretKey;
    } catch (error) {
      console.error('Error parsing AWS credentials from secrets:', error);
    }
  }

  return { awsRegion, awsAccessKey, awsSecretKey };
}

const environment = parseAWSCredentials();

export default environment;
