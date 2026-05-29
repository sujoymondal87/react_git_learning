const express = require('express');

const router = express.Router();

const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
    const { fullName, email, phone, message } = req.body;
  
    // insert into supabase here
    const { data, error } = await supabase
    .from('contacts')
    .insert({ fullname:fullName, email, phone, message })

    // handle error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Thanks for reaching out',
        html: '<p>Thank you for reaching out to us. We will get back to you as soon as possible.</p>'
      });

    // return success response
    return res.status(200).json({ message: 'Contact added successfully' });
});

module.exports = router;