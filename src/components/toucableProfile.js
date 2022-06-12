import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { compose, color, size, space, flexbox , layout} from 'styled-system'

const TouchableButton = styled(TouchableOpacity)(compose(flexbox, space, color, size , layout));

TouchableButton.defaultProps = {
    flexDirection: 'row',
    borderWidth : 11,
    borderColor : 'black',
    borderRadius : 5
};

export default TouchableButton;