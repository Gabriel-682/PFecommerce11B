const { Item, Food, sequelize } = require("../../db");

const getBestSellersController = async () => {
  const productosVendidos = await Item.findAll({
    attributes: [
      'FoodId',
      [sequelize.fn('SUM', sequelize.col('quantity')), 'total_vendidos'],
    ],
    include: [],
    group: ['FoodId'],
    raw: true, 
  });


  const productosVendidosConNombre = await Promise.all(
    productosVendidos.map(async (producto) => {
      const { FoodId, total_vendidos } = producto;
      const food = await Food.findOne({ where: { id: FoodId }, attributes: ['name'] });
      return {
        label :FoodId,
        value: total_vendidos,
        id: food ? food.name : 'No disponible', 
      };
    })
  );

  return productosVendidosConNombre;
};

module.exports = { getBestSellersController };
