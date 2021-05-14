#Сигналы слушатели посылают сигнал при изменении данных пользователя
# Нужно обработать его
from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email
# Когда мы меняем emal автомотически username устанавливается равный ему
pre_save.connect(updateUser,sender=User)