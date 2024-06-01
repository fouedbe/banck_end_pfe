const nodemailer = require("nodemailer");

const user = "fouedbenrejeb6@gmail.com"; // hedhi t7ot feha l email 
const pass = "kyhs kcxb oswc yllq"; // houni lazmek ta3mel generation lel code hedha gmail apps 

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
//fonction te5ou 3 parametres
module.exports.sendConfirmationEmail = (
  username,
  email,
  confirmation,
  
) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Veuillez activer votre compte ",
      html: `
      <div>
      <h1>Activation du compte </h1>
        <h2>Bonjour ${username}</h2>
        <p>Veuillez confirmer votre email en cliquant sur le lien suivant
</p>
        <a href=http://localhost:3000/confirmation>Cliquez ici
</a>
<ul>
<li> votre nom d'utilisateur ${username}  </li>
<li> votre mot de passe ${confirmation}  </li>
</ul>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendResetPasswordEmail = async (email, randomCode) => {
  try {
    await transport.sendMail({
      from: user, // Remplacez par votre adresse e-mail
      to: email,
      subject: "Demande reinitialisation du mot de passe",
      html: `
        <div>
          <h1>Réinitialisation du mot de passe</h1>
          <p>votre code ${randomCode}</p>
          <p>Réinitialisez votre mot de passe en cliquant sur le lien suivant:</p>
          <a href="http://localhost:3000/updatepass">Cliquez ici</a>
        </div>
      `
    });
    console.log('Email de réinitialisation envoyé avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', err);
    throw err;
  }
};

module.exports.sendWinElectionEMail = (email) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Résultat élection",
      html: `
      <div>
      <h1> Vous avez ganger dans cette élection et vous serez syndic </h1>
      
        <p>ous avez ganger dans cette élection et vous serez syndic
</p>
      
        </div>`,
    })
    .catch((err) => console.log(err));
};
