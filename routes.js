'use strict';

module.exports = function (app) {

  app.route('/api/timestamp/:date?')
    .get((req, res) => {
      let dateString = req.params.date ?? Date.now()
      let date;
      try {
        date = new Date(Date.parse(dateString))
        if (date == 'Invalid Date') date = new Date(Number(dateString))
        if (date == 'Invalid Date') throw new Error()
      } catch (error) {
        return res.json({ error: "Invalid Date" })
      }
      let unix = date.getTime()
      let utc = date.toUTCString()
      if (utc.includes('03:00:00')) {
        utc = utc.replace('03:00:00', '00:00:00')
        unix = unix - (180 * 60 * 1000)
      }
      return res.json({ unix, utc })

    });


};
