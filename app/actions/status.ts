const statusHandler = async (req, res) => {
  res.status(200).json({
    status: {
      http: "Healthy"
    }
  });
};

export { statusHandler };
