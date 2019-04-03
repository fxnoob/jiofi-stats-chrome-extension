import React from 'react';
import { PopupMessenger } from '../../src/utils/message'
const message = new PopupMessenger()
const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});
class  MediaControlCard extends React.Component{
    state = {
       isDataMounted: false ,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        message.listen((msg)=>{console.log(msg)})
    }
    render() {
        const { classes, theme } = this.props;
        return (
          <div>
              gh
          </div>
        );
    }
}

export default MediaControlCard;
