# Starter Kit para negocio de Generación de Imágenes IA NSFW

Este es el código fuente completo de www.aixa.app, una idea de negocio para que los clientes puedan generar imágenes NSFW con sus propios prompts, con miles de modelos y LORAS, mediante el proveedor de IA Novita.ai

# ¿Cómo funciona?

El proyecto dispone de una landing page y varias páginas de información, entre ellas, la de suscripciones, en la que se ofrece 3 modelos de suscripción al usuario, cada modelo ofrece más o menos generaciones mensuales.
Una vez identificados, los usuarios accederan al dashboard, en el que podrán generar imágenes mediante un prompt y seleccionando un modelo, también podrán cambiar una imagen existente.

# Flujo

1. Cliente se registra
2. Extensión de Stripe crea cuenta en Stripe.
3. Crea un item en la colección Users
4. Se llama al webhook de Stripe (pages/api/stripe/webhook.ts) al método `handleCustomerCreatedSucceeded` y asigna un número de generaciones gratuitas al usuario
5. Si el cliente se llega a suscribir, se llama al método `handlePaymentSucceeded` y en base al id del producto, asigna el número de generaciones
6. Cada vez que un cliente genere una imagen, se restará del contador de número de generaciones que tenga
7. Cuando un usuario genera una imagen, se crea una task en la api de NOVITA.AI, esto devuelve un ID de task, consultaremos cada 5 segundos hasta que se genere y la mostraremos en pantalla.
8. Las imágenes se almacenan en Firebase Storage

## NOTA

No olvides de actualizar tus id de productos en pages/api/stripe/webhook.ts

### Proyecto con stack Next.js, shadcn/ui, Tailwind, Firebase Auth, Firestore, Stripe Payments y Novita AI... WOW!

- **Next.js** para una mejor experiencia con React
- **Firebase** para autenticación y base de datos (Firestore)
- **Firebase Auth** incluye soporte para inicio de sesión con Google y con email/contraseña
- **Firebase Storage** para almacenar las imágenes generadas por los usuarios
- **Shadcn y Tailwind** para la interfaz de usuario/estilizado
- **Stripe** para las suscripciones de clientes, incluye página con precios de suscripciones
- **API** incluye una api completa independiente
- **Stream CHAT** para que tus clientes puedan chatear contigo
- **Ready** proyecto totalmente funcional y listo para despliegue
- **Capacitor** instalado por si necesitas versión mobile

## Nota

Puedes ver este proyecto funcionando en producción en www.aixa.app

## Documentación NOVITA.AI

https://novita.ai/docs/get-started/quickstart.html

**¡Espero que os guste!**

## Configuración

Necesitas obtener una cuenta en NOVITA.AI https://novita.ai/

1. Renombra `.env.example` a `.env.local`
2. Reemplaza el valor de `NOVITA_API_KEY` con la key obtenida
3. Obtén la clave privada de la cuenta de servicio de Firebase, conviértela a formato de cadena (stringify) y asigna esa cadena a la variable anterior.
   > Ejemplo: `FIREBASE_ADMIN_SDK={"type":"service_account","project_id":"sleeptoken",...}`
4. Asegúrate de que tu proyecto de Firebase tenga la autenticación activada (Google y Email/Password)
5. Obtén la configuración pública de Firebase y pégala en `components\firebase-providers.tsx`
6. Instala las dependencias `npm i` y `npm run dev` para iniciar el proyecto
7. El sistema de suscripciones con Stripe funciona con la extensión de Firestore https://extensions.dev/extensions/invertase/firestore-stripe-payments
8. Actualiza `STRIPE_WEBHOOK_SECRET` y `STRIPE_SECRET_KEY` con tus valores
9. Actualiza las keys de Stream Chat con las tuyas https://getstream.io/chat/

## Dudas?

Puedes contactar conmigo en Telegram @davidcanton1987
O por email davidcantonnadales@gmail.com

No es un código perfecto, pero es una buena base¡

**Creado por [David Cantón Nadales](https://www.davidcanton.net)**
