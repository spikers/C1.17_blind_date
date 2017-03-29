var sg = require('sendgrid')('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');
var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
        personalizations: [
            {
                to: [
                    {
                        email: 'yaerilim@gmail.com',
                    },
                ],
                subject: '[WYNK] We found a match for you!',
            },
        ],
        from: {
            email: 'test@example.com',
        },
        content: [
            {
                type: 'text/html',
                value:'<img src="logo.png"></br>' +
                '<img src="match.jpg"></br>' +
                '<h1>Hi, _____</h1></br>' +
                '<h2>We found a match for you!</h2></br>' +
                '<h2>Click <a href="/">here</a> to see who your match is!</h2>',
            },
        ],
    },
});

sg.API(request, function(error, response) {
    if (error) {
        console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
});