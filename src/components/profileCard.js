import {View} from 'react-native'
import styled from 'styled-components'
import {compose,color,size,space,flexbox, layout} from 'styled-system'

const ProfileCard = styled(View)(compose(flexbox,space,color,size,layout));

export default ProfileCard;