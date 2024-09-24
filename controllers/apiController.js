const obtenerRoot = (req, res) => {
  res.status(200).send("Hola Mundo");
};

const obtenerApi = (req, res) => {
  res.status(200).json({ message: "API funcionando OK" });
};

const obtenerSaludo = (req, res) => {
  const nombre = process.env.ADMINISTRADOR || "amigo";
  res.status(200).json("¡Hola, " + nombre + "!");
};

module.exports = {
  obtenerRoot,
  obtenerApi,
  obtenerSaludo,
};
