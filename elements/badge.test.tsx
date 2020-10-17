import { shallow } from 'enzyme'

import { Badge } from './badge'

test('renders without crashing', () => {
    expect(shallow(<Badge>Badge</Badge>).isEmptyRender()).toEqual(false)
})

test('text is children', () => {
    expect(shallow(<Badge> </Badge>).text()).toEqual(' ')
    expect(shallow(<Badge>Badge</Badge>).text()).toEqual('Badge')
    expect(shallow(<Badge>badge</Badge>).text()).toEqual('badge')
    expect(shallow(<Badge>two words</Badge>).text()).toEqual('two words')
})
