import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UrlInput } from '../url-input'

const invalidUrls = [
    'john smith',
    'hello@example.com',
    'foo@bar.com',
    'http://localhost:3000/',
    '//foobar.com',
    'xyz://foobar.com',
    'invalid/',
    'invalid.x',
    'invalid.',
    '.com',
    'http://com/',
    'http://300.0.0.1/',
    'mailto:foo@bar.com',
    'rtmp://foobar.com',
    'http://www.xn--.com/',
    'http://xn--.com/',
    'http://www.foobar.com:0/',
    'http://www.foobar.com:70000/',
    'http://www.foobar.com:99999/',
    'http://www.-foobar.com/',
    'http://www.foobar-.com/',
    'http://foobar/# lol',
    'http://foobar/? lol',
    'http://foobar/ lol/',
    'http://lol:lol:lol@foobar.com/',
    'http://www.foo_bar.com/',
    'http://\n@www.foobar.com/',
    'http://*.foo.com',
    '*.foo.com',
    '!.foo.com',
    'http://example.com.',
    'http://localhost:61500this is an invalid url!!!!',
    `////foobar.com`,
    `http:////foobar.com`,
    "https://example.com/foo/<script>alert('XSS')</script>/",
    'myemail@mail.com',
]
test.each(invalidUrls)('"%s" is marked as invalid', (url) => {
    render(<UrlInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, url)
    userEvent.tab()

    expect(screen.getByText('Error:')).toBeTruthy()
})

const validUrls = [
    'https://example.com',
    'http://facebook.com/this.is.a.path',
    'foobar.com',
    'www.foobar.com',
    'foobar.com/',
    'valid.au',
    'http://www.foobar.com/',
    'HTTP://WWW.FOOBAR.COM/',
    'https://www.foobar.com/',
    'HTTPS://WWW.FOOBAR.COM/',
    'http://www.foobar.com:23/',
    'http://www.foobar.com:65535/',
    'http://www.foobar.com:5/',
    'https://www.foobar.com/',
    'http://www.foobar.com/~foobar',
    'http://user:pass@www.foobar.com/',
    'http://user:@www.foobar.com/',
    'http://127.0.0.1/',
    'http://10.0.0.0/',
    'http://189.123.14.13/',
    'http://duckduckgo.com/?q=%2F',
    "http://foobar.com/t$-_.+!*'(),",
    'http://foobar.com/?foo=bar#baz=qux',
    'http://foobar.com?foo=bar',
    'http://foobar.com#baz=qux',
    'http://www.xn--froschgrn-x9a.net/',
    'http://xn--froschgrn-x9a.com/',
    'http://foo--bar.com',
    'http://høyfjellet.no',
    'http://xn--j1aac5a4g.xn--j1amh',
    'http://xn------eddceddeftq7bvv7c4ke4c.xn--p1ai',
    'http://кулік.укр',
    'test.com?ref=http://test2.com',
    'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html',
    'http://[1080:0:0:0:8:800:200C:417A]/index.html',
    'http://[3ffe:2a00:100:7031::1]',
    'http://[1080::8:800:200C:417A]/foo',
    'http://[::192.9.5.5]/ipng',
    'http://[::FFFF:129.144.52.38]:80/index.html',
    'http://[2010:836B:4179::836B:4179]',
    'http://example.com/example.json#/foo/bar',
    'http://user:@www.foobar.com',
]
test.each(validUrls)('"%s" is marked as valid', (url) => {
    render(<UrlInput />)

    const input = screen.getByTestId('text-input-element')

    expect(screen.queryByText('Error:')).toBeFalsy()

    userEvent.type(input, url)
    userEvent.tab()

    expect(screen.queryByText('Error:')).toBeFalsy()
})
