import { createTransport } from 'nodemailer';

export const emailRegister = async ( email: string, name: string, lastname: string, token: string ) => {
  try {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Rena 👻" <u18215194@gmail.com>`,
      to: email,
      subject: 'Registro de cuenta en TeamTasker',
      html: `
        <!DOCTYPE html>
        <html lang="es" style=" box-sizing: border-box; padding: 0; margin: 0;">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registro de Usuario</title>
          <style>
            @media screen and (max-width: 450px) {
              img.image__header {
                width: 15rem !important; 
              }
            }
          </style>
        </head>
        <body style="background: radial-gradient(circle, rgba(70,172,252,1) 55%, rgba(70,190,252,0.8800770308123249) 63%); font-family: Poppins, sans-serif; padding: 3rem 1rem; margin: 0;"
        >
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 3rem);">
            <div style="background-color: #1B1B1B; color: aliceblue; max-width: 28rem; border-radius: .5rem; padding: 2rem;">
        
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; "> <!-- Header -->
                <h1 style="font-size: 2.5rem; margin: 0; text-align: center;">Team Tasker</h1>
                <p style="margin: 0; padding: .5rem 0 1rem; font-size: 1.1rem;">Registro de cuenta</p>
              </div>  <!-- End Header -->
        
              <div style="background-image: url(https://zsfpcx.stripocdn.email/content/guids/CABINET_9aa36f49cdb5185ad35ee0f7a5c7d9380ade3ae69ada3493ecaa145d1284bee9/images/group_347_1.png); background-size: cover; background-position: center; background-repeat: no-repeat; border: .1rem solid rgba(70,172,252,1); border-radius: .5rem; padding: 0 1rem;"> <!-- Body -->
                <p>Estimado/a <span style="font-weight: bold; font-size: 1.3rem;">${name + ' ' + lastname} ,</span></p>
                <p>Te damos la bienvenida a nuestro sitio web <span style="font-weight: bold; font-size: 1.1rem;">Team Tasker</span></p>
                <p>Para completar su registro , debe confirmar su dirección de correo electrónico haciendo click en el siguiente enlace :</p>
        
                <a href="${process.env.FRONTEND_URI}/auth/confirm-account/${token}" target="_blank" style="padding: 1rem; text-align: center; display: block; color: #f1f1f1; background-color: rgba(70,172,252,1);text-decoration: none; border-radius: 5rem; margin-bottom: 1rem;">Confirmar Cuenta</a>
              </div>  <!-- End Body -->
        
              <div style="margin-top: 1.5rem; line-height: 1.8;">
                <p style="margin: 0;">Atentamente,</p>
                <p style="font-weight: 700; margin: 0;">El equipo de Team Tasker</p>
              </div>
            </div>
        
            <div style="display: flex; flex-direction: column; margin-top: 1.5rem; color: #333333; text-align: center; font-size: .9rem;">
              <small>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</small>
              <small>Copyright © 2023 <span style="font-weight: 800;">TeamTasker</span>, Todos los derechos reservados.</small>
            </div>
          </div>
        </body>
        </html>
      `,
    });

  } catch (error) {
    console.log(error)
  }
}

export const emailForgotPassword = async ( email: string, name: string, lastname: string, token: string ) => {
  try {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Rena 👻" <u18215194@gmail.com>`,
      to: email,
      subject: 'Restablecer contraseña en TeamTasker',
      html: `
        <!DOCTYPE html>
        <html lang="es" style=" box-sizing: border-box; padding: 0; margin: 0;">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Restablecer contraseña</title>
          <style>
            @media screen and (max-width: 450px) {
              img.image__header {
                width: 15rem !important; 
              }
            }
          </style>
        </head>
        <body style="background: radial-gradient(circle, rgba(70,172,252,1) 55%, rgba(70,190,252,0.8800770308123249) 63%); font-family: Poppins, sans-serif; padding: 3rem 1rem; margin: 0;"
        >
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 3rem);">
            <div style="background-color: #1B1B1B; color: aliceblue; max-width: 28rem; border-radius: .5rem; padding: 2rem;">
        
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; "> <!-- Header -->
                <h1 style="font-size: 2.5rem; margin: 0; text-align: center;">Team Tasker</h1>
                <p style="margin: 0; padding: .5rem 0 1rem; font-size: 1.1rem;">Restablecer contraseña</p>
              </div>  <!-- End Header -->
        
              <div style="background-image: url(https://zsfpcx.stripocdn.email/content/guids/CABINET_9aa36f49cdb5185ad35ee0f7a5c7d9380ade3ae69ada3493ecaa145d1284bee9/images/group_347_1.png); background-size: cover; background-position: center; background-repeat: no-repeat; border: .1rem solid rgba(70,172,252,1); border-radius: .5rem; padding: 0 1rem;"> <!-- Body -->
                <p>Estimado/a <span style="font-weight: bold; font-size: 1.3rem;">${name + ' ' + lastname} ,</span></p>
                <p>Hemos recibido su solicitud para reestablecer su contraseña en nuestro sitio web <span style="font-weight: bold; font-size: 1.1rem;">Team Tasker</span></p>
                <p>Para continuar con el proceso de reestablecimiento de contraseña, haga click en el siguiente enlace :</p>
        
                <a href="${process.env.FRONTEND_URI}/auth/reset-password/${token}" target="_blank" style="padding: 1rem; text-align: center; display: block; color: #f1f1f1; background-color: rgba(70,172,252,1);text-decoration: none; border-radius: 5rem; margin-bottom: 1rem;">Restablecer contraseña</a>
              </div>  <!-- End Body -->
        
              <div style="margin-top: 1.5rem; line-height: 1.8;">
                <p style="margin: 0;">Atentamente,</p>
                <p style="font-weight: 700; margin: 0;">El equipo de TeamTasker</p>
              </div>
            </div>
        
            <div style="display: flex; flex-direction: column; margin-top: 1.5rem; color: #333333; text-align: center; font-size: .9rem;">
              <small>Si no ha solicitado un reestablecimiento de contraseña, por favor ignore este mensaje.</small>
              <small>Copyright © 2023 <span style="font-weight: 800;">TeamTasker</span>, Todos los derechos reservados.</small>
            </div>
          </div>
        </body>
        </html>
      `,
    });

  } catch (error) {
    console.log(error)
  }
}