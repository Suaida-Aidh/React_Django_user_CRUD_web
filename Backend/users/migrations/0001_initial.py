# Generated by Django 4.2.5 on 2024-06-25 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=250, unique=True)),
                ('email', models.EmailField(max_length=250, unique=True)),
                ('password', models.CharField(max_length=250)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='profile')),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
