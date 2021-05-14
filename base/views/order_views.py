from django.shortcuts import render

from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import ProductSerializer, OrderSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser # Модуль для проверки на врторизацию

from rest_framework import status # Коды статуса 
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        #(1) Создание заказа

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            totalPrice=data['totalPrice'],
            shippingPrice=data['shippingPrice']
        )

        #(2) Создание адреса доставки

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddres']['address'],
            city=data['shippingAddres']['city'],
            postalCode=data['shippingAddres']['postalCode'],
            country=data['shippingAddres']['country'],
        )

        #(3) Установить отношение элемента заказа к заказу
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty= i['qty'],
                price= i['price'],
                image=product.image.url,
            )
           
        #(4) Обновить количество
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not autorized to viev this order'}, 
            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)
    
    order.idDelivered = True
    order.deviveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')