const errorMappings = (message: string) => {
  return {
    InvoiceNotFoundError: { status: 404, message },
    CannotEditInvoiceError: { status: 422, message },
    CompanyNotFoundError: { status: 404, message }
  };
};

export const mapErrorToApiResponse = (error: Error) => {
  return (
    errorMappings(error.message)[error.name] || { status: 500, message: `Internal Server Error: ${error.message}` }
  );
};
