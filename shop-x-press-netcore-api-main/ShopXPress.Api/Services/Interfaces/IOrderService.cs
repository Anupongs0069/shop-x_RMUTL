namespace ShopXPress.Api.Services.Interfaces;

public interface IOrderService
{
    Task GetUserOrders(int userId);
    Task GetAllOrders();
    Task CreateOrder();
    Task UpdateOrder(int orderId);
    Task DeleteOrder(int orderId);
}
