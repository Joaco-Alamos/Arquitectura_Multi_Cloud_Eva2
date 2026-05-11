# ERP Farmacias SIMI
Este proyecto implementa un sistema ERP contenerizado con una arquitectura Tier-2 en AWS.

## Arquitectura
- **FrontEnd:** Node.js + Express en contenedor Docker.
- **BackEnd:** PostgreSQL en contenedor Docker.
- **Interconexión:** Comunicación mediante IP Privada y Security Groups restringidos.

## Cómo desplegar
1. Clonar el repositorio.
2. Construir la imagen: `docker build -t simi-frontend .`
3. Ejecutar: `docker run -d -p 80:3000 simi-frontend`

## Seguridad
Se aplicó Hardening de red cerrando todos los puertos innecesarios, dejando solo el 80 (HTTP) para el servicio y el 22 (SSH) para administración.
