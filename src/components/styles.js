import { baseColors, fontStyle, layoutStyle, borderStyle, buttonStyle, imageStyle } from './defaults';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardView: {
        backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY,
        shadowColor: layoutStyle.SHADOW_COLOR,
        shadowOffset: layoutStyle.SHADOW_OFFSET,
        shadowOpacity: layoutStyle.SHADOW_OPACITY,
        shadowRadius: layoutStyle.SHADOW_RADIUS,
        elevation: layoutStyle.ELEVATION_SECONDARY,
        paddingBottom: layoutStyle.PADDING_VERT_PRIMARY,
    },
    cardSectionView: {
        paddingLeft: layoutStyle.PADDING_HORI_PRIMARY,
        paddingRight: layoutStyle.PADDING_HORI_PRIMARY,
        paddingTop: layoutStyle.PADDING_VERT_SMALL,
        backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY,
        flexDirection: 'row',
        position: 'relative',
    },
    cardHeaderView: {
        backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY,
        marginTop: layoutStyle.MARGIN_VERT_SMALL,
        marginBottom: layoutStyle.MARGIN_VERT_SMALL,
    },
    cardHeaderText: {
        padding: layoutStyle.PADDING_VERT_VERY_SMALL,
        paddingLeft: layoutStyle.PADDING_HORI_PRIMARY,
        paddingRight: layoutStyle.PADDING_HORI_PRIMARY,
        fontSize: fontStyle.FONT_SIZE_TITLE,
        fontWeight: fontStyle.FONT_WEIGHT_NORMAL,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    customCalendar: {
        marginBottom: layoutStyle.MARGIN_VERT_PRIMARY,
        elevation: layoutStyle.ELEVATION_SECONDARY
    },
    customCalendarSelectedDate: {
        backgroundColor: 'transparent',
        borderWidth: borderStyle.BORDER_WIDTH_SECONDARY,
        borderRadius: borderStyle.BORDER_RADIUS_SECONDARY,
        borderColor: borderStyle.BORDER_COLOR_PRIMARY,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY
    },
    buttonTouchable: {
        backgroundColor: buttonStyle.BUTTON_BACKGROUND_COLOR_PRIMARY,
        borderRadius: buttonStyle.BUTTON_BORDER_RADIUS_SECONDARY,
        // borderWidth: buttonStyle.BUTTON_BORDER_WIDTH_PRIMARY,
        // borderColor: buttonStyle.BUTTON_BORDER_COLOR_PRIMARY,
        padding: buttonStyle.BUTTON_PADDING_SMALL,
        marginTop: buttonStyle.BUTTON_MARGIN_VERT,
        paddingLeft: buttonStyle.BUTTON_PADDING_PRIMARY,
        paddingRight: buttonStyle.BUTTON_PADDING_PRIMARY,
    },
    buttonText: {
        alignSelf: 'center',
        color: buttonStyle.BUTTON_FONT_COLOR_PRIMARY,
        fontSize: buttonStyle.BUTTON_FONT_SIZE_PRIMARY,
        fontWeight: buttonStyle.BUTTON_FONT_WEIGHT_PRIMARY,
        fontFamily: buttonStyle.BUTTON_FONT_FAMILY_PRIMARY,
        textTransform: buttonStyle.BUTTON_TEXT_TRANSFORM,
        letterSpacing: buttonStyle.BUTTON_LETTER_SPACING_PRIMARY,
    },
    formItemView: {
        padding: layoutStyle.PADDING_HORI_PRIMARY,
        paddingBottom: 0,
        paddingLeft: 0
    },
    formItemTitle: {
        color: fontStyle.FONT_COLOR_PRIMARY,
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        marginLeft: layoutStyle.MARGIN_HORI_PRIMARY,
        marginBottom: layoutStyle.MARGIN_VERT_SMALL,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
    },
    formTextfield: {
        color: fontStyle.FONT_COLOR_PRIMARY,
        fontSize: fontStyle.FONT_SIZE_NORMAL,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        marginLeft: layoutStyle.MARGIN_HORI_PRIMARY,
        paddingLeft: layoutStyle.PADDING_HORI_PRIMARY
    },
    formBorder: {
        height: 40,  // have to do it on iOS
        borderColor: borderStyle.BORDER_COLOR_PRIMARY,
        borderWidth: borderStyle.BORDER_WIDTH_PRIMARY,
        borderRadius: borderStyle.BORDER_RADIUS_PRIMARY
    },
    formDropdownPickerView: {
        height: 40,  // have to do it on iOS
        borderColor: borderStyle.BORDER_COLOR_PRIMARY,
        borderWidth: borderStyle.BORDER_WIDTH_PRIMARY,
        borderRadius: borderStyle.BORDER_RADIUS_PRIMARY,
        color: fontStyle.FONT_COLOR_PRIMARY,
        fontSize: fontStyle.FONT_SIZE_NORMAL,
        marginLeft: layoutStyle.MARGIN_HORI_PRIMARY,
        paddingLeft: layoutStyle.PADDING_HORI_PRIMARY
    },
    formButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: buttonStyle.BUTTON_MARGIN_VERT,
        paddingTop: buttonStyle.BUTTON_PADDING
    },
    formButtonTextField: {
        textAlign: 'center',
        borderRadius: borderStyle.BORDER_RADIUS_SECONDARY,
        paddingLeft: layoutStyle.PADDING_HORI_PRIMARY,
        paddingRight: layoutStyle.PADDING_HORI_PRIMARY
    },
    showMoreText: {
        color: baseColors.THEME_COLOR,
        fontSize: fontStyle.FONT_SIZE_NORMAL,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        fontWeight: fontStyle.FONT_WEIGHT_BOLD,
        textAlign: 'right'
    },
    cardTitleLarge: {
        fontSize: fontStyle.FONT_SIZE_LARGE,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardTitleSemiLarge: {
        fontSize: fontStyle.FONT_SIZE_TERTIARY,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardTitle: {
        fontSize: fontStyle.FONT_SIZE_TITLE,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardSubTitleBold: {
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardSubTitle: {
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardDateBold: {
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
        // letterSpacing: fontStyle.FONT_LETTER_SPACING_PRIMARY,
    },
    cardDate: {
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY,
        // letterSpacing: fontStyle.FONT_LETTER_SPACING_PRIMARY,
    },
    cardScore: {
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardDesc: {
        fontSize: fontStyle.FONT_SIZE_PRIMARY,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY,
        // letterSpacing: fontStyle.FONT_LETTER_SPACING_PRIMARY,
        textAlign: 'justify',
    },
    cardDescBold: {
        fontSize: fontStyle.FONT_SIZE_PRIMARY,
        fontFamily: fontStyle.FONT_FAMILY_SEMI_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    cardRemark: {
        fontSize: fontStyle.FONT_SIZE_SMALL,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY,
        // letterSpacing: fontStyle.FONT_LETTER_SPACING_PRIMARY,
        textAlign: 'justify',
    },

    cardScoreBold: {
        fontSize: fontStyle.FONT_SIZE_SECONDARY,
        fontFamily: fontStyle.FONT_FAMILY_BOLD,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },

    cardAmount: {
        fontSize: fontStyle.FONT_SIZE_NORMAL,
        fontFamily: fontStyle.FONT_FAMILY_NORMAL,
        color: fontStyle.FONT_COLOR_PRIMARY,
    },
    commonViewFlex: {
        flex: 1,
        backgroundColor: baseColors.BACKGROUND_COLOR_PRIMARY,
    },
    imageSemiRounded: {
        height: imageStyle.IMAGE_SIZE_PRIMARY,
        width: imageStyle.IMAGE_SIZE_PRIMARY,
        borderRadius: imageStyle.IMAGE_BORDER_RADIUS_PRIMARY,
        backgroundColor: imageStyle.IMAGE_BACKGROUND_COLOR,
    },
    imageRounded: {
        height: imageStyle.IMAGE_SIZE_SECONDARY,
        width: imageStyle.IMAGE_SIZE_SECONDARY,
        borderRadius: imageStyle.IMAGE_RADIUS_SECONDARY,
        backgroundColor: imageStyle.IMAGE_BACKGROUND_COLOR,
    }
});
