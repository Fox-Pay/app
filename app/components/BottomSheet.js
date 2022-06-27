import React, { useCallback } from 'react';
import {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetModalProvider,    
  } from '@gorhom/bottom-sheet';

import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import Text from './Text';
import fonts from '../config/fonts';
  
export default React.forwardRef(function BottomSheet({ snapPoints, title, subtitle, children }, ref) {
    const renderBackdrop = useCallback((props) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            animatedIndex={{ value: 1 }}
        />
    ), []);

  return (
    <BottomSheetModalProvider>
        <BottomSheetModal
            index={0}
            ref={ref}
            enablePanDownToClose
            snapPoints={snapPoints}
            keyboardBlurBehavior="restore"
            backgroundStyle={colors.primary}
            backdropComponent={renderBackdrop}
        >
            <View style={styles.contentContainer}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalSubtitle}>{subtitle}</Text>
                {children}
            </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
});

const styles = StyleSheet.create({
    contentContainer: {
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginLeft: 10,
        fontFamily: fonts.PoppinsBold,
    },
    modalSubtitle: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10,
        color: colors.medium,
        fontFamily: fonts.PoppinsBold,
    },
})