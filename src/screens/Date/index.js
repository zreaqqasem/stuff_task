import {React} from 'react';
import {View, Text, Image} from 'react-native';

import DatepickerRange from 'react-native-range-datepicker';
import {connect} from 'react-redux';
import DatePicker from 'react-native-date-ranges';
import {styles} from '../../../styles';

const Post = ({post}) => {
  return (
   <DatePicker
    style={ { width: 350, height: 45 } }
    customStyles = { {
        placeholderText:{ fontSize:20 } // placeHolder style
        headerStyle : {  },         // title container style
        headerMarkTitle : { }, // title mark style 
        headerDateTitle: { }, // title Date style
        contentInput: {}, //content text container style
        contentText: {}, //after selected text Style
    } } // optional 
    centerAlign // optional text will align center or not
    allowFontScaling = {false} // optional
    placeholder={'Apr 27, 2018 → Jul 10, 2020'}
    mode={'range'}
/>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
