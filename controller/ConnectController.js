const Connect = require('../model/Connect');
const ejs = require("ejs");
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const puppeteer = require('puppeteer');

async function addConnect(req, res) {
  try {
    const {
      advanceAmount, samyRupees, airWaste, gressCount, gressAmount, addBlueOil, total, grandTotal, anotherTimeAdvance,
      addBlueOilAmount,anotherTimeGressName,anotherTimeValue,extraName,extraValue, sencondAddBlueOil, sencondOilAmount, secondTotal, finalTotal
    } = req.body;

    const connects = await Connect.create({
      advanceAmount,
      samyRupees,
      airWaste,
      gressCount,
      gressAmount,
      addBlueOil,
      addBlueOilAmount,
      anotherTimeGressName,
      anotherTimeValue,
      extraName,
      extraValue,
      total,
      grandTotal,
      anotherTimeAdvance,
      sencondAddBlueOil,
      sencondOilAmount,
      secondTotal,
      finalTotal
    });

    ejs.renderFile(
      path.join(__dirname, '../views/', 'report.ejs'),
      { connects },
      async (err, html) => {
        if (err) {
          console.error("EJS Rendering Error:", err);
          return res.status(500).send("Error rendering PDF template");
        } else {
          try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html);
            await page.pdf({ path: 'test.pdf', format: 'A4' });

            console.log("PDF generated successfully at test.pdf");
            await browser.close();
            sendEmail('test.pdf');
          } catch (error) {
            console.error("PDF Generation Error:", error);
          }
        }
      }
    );


    function sendEmail(pdfPath) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'arunedaily7098@gmail.com',
          pass: 'wtzq dpsm kvcr whyh'
        }
      });
      // sankarsankar13776338@gmail.com
      let mailOptions = {
        from: 'arunedaily7098@gmail.com',
        to: 'arunedaily9608@gmail.com',
        subject: 'Welcome To Sri Aruna Agency..!',
        attachments: [
          {
            filename: 'Truck_Report.pdf',
            path: pdfPath
          }
        ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error Occured: ' + error);
        } else {
          console.log("Email sent Successfully to " + mailOptions.to);
        }
      });
    }

  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({ error: 'Failed to add property' });
  }
}

async function getConnect(req, res) {
  try {
    const connectId = req.params.connectId;
    const getConnect = await Connect.findAll({
      where: { id: connectId }
    });

    res.status(201).json(getConnect);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
}



module.exports = { addConnect, getConnect };
