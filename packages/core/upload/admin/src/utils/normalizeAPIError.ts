import type { FetchError } from '@strapi/admin/strapi-admin';
import type { errors } from '@strapi/utils';

type ApiError = InstanceType<(typeof errors)[keyof typeof errors]>;

interface NormalizeErrorOptions {
  name?: string;
  intlMessagePrefixCallback?: (id: string) => string;
}

interface NormalizeErrorReturn {
  id: string;
  defaultMessage: string;
  name?: string;
  values: Record<'path', string> | Record<string, never>;
}

interface YupFormattedError {
  path: string[];
  message: string;
  name: string;
  value: string;
}

function getPrefixedId(message: string, callback?: (prefixedMessage: string) => string) {
  const prefixedMessage = `apiError.${message}`;

  // if a prefix function has been passed in it is used to
  // prefix the id, e.g. to allow an error message to be
  // set only for a localization namespace
  if (typeof callback === 'function') {
    return callback(prefixedMessage);
  }

  return prefixedMessage;
}

function normalizeError(
  error: ApiError | YupFormattedError,
  { name, intlMessagePrefixCallback }: NormalizeErrorOptions
): NormalizeErrorReturn {
  const { message } = error;

  const normalizedError = {
    id: getPrefixedId(message, intlMessagePrefixCallback),
    defaultMessage: message,
    name: error.name ?? name,
    values: {},
  };

  if ('path' in error) {
    normalizedError.values = { path: error.path.join('.') };
  }

  return normalizedError;
}

const validateErrorIsYupValidationError = (
  err: ApiError
): err is errors.YupValidationError & { details: { errors: YupFormattedError[] } } =>
  typeof err.details === 'object' && err.details !== null && 'errors' in err.details;

/**
 * Normalize the format of `ResponseError`
 * in places where the hook `useAPIErrorHandler` can not called
 * (e.g. outside of a React component).
 */
export function normalizeAPIError(
  apiError: FetchError,
  intlMessagePrefixCallback?: NormalizeErrorOptions['intlMessagePrefixCallback']
):
  | NormalizeErrorReturn
  | { name: string; message: string | null; errors: NormalizeErrorReturn[] }
  | null {
  const error = apiError.response?.data.error;

  if (error) {
    // some errors carry multiple errors (such as ValidationError)
    if (validateErrorIsYupValidationError(error)) {
      return {
        name: error.name,
        message: error?.message || null,
        errors: error.details.errors.map((err) =>
          normalizeError(err, { name: error.name, intlMessagePrefixCallback })
        ),
      };
    }

    return normalizeError(error, { intlMessagePrefixCallback });
  }

  return null;
}
