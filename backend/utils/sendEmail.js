import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOrderConfirmationEmail = async (user, order) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email not configured — skipping order confirmation email');
    return;
  }

  const itemsList = order.orderItems
    .map((item) => `<li>${item.name} x ${item.quantity} — $${item.price.toFixed(2)}</li>`)
    .join('');

  const mailOptions = {
    from: `"ShopHub Store" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Order Confirmation #${order._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <h2>Thank you for your order, ${user.name}!</h2>
      <p>Your order has been placed successfully.</p>
      <h3>Order Items:</h3>
      <ul>${itemsList}</ul>
      <p><strong>Total: $${order.totalPrice.toFixed(2)}</strong></p>
      <p>Shipping to: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}</p>
      <p>We will notify you when your order ships.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Email send failed:', error.message);
  }
};

export const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: `"ShopHub Store" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Welcome to ShopHub!',
    html: `
      <h2>Welcome, ${user.name}!</h2>
      <p>Thank you for registering at ShopHub. Start shopping our amazing products today!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Welcome email failed:', error.message);
  }
};
