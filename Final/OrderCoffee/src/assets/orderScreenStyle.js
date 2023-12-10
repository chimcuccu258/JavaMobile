// OrderScreenStyles.js

import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.8,
  },
  closeBtn: {
    position: 'absolute',
    marginTop: 10,
    alignItems: 'flex-end',
    right: 10,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  readMoreLess: {
    color: colors.mainColor,
  },
  optionBtn: {
    flex: 1,
    position: 'absolute',
    height: windowHeight * 0.11,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  optionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  optionBtnContainerLeft: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  quantityBtn: {
    backgroundColor: colors.secondaryColor,
    padding: 5,
    borderRadius: 50,
  },
  orderBtn: {
    backgroundColor: colors.mainColor,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 5,
  },
  orderBtnText: {
    fontSize: 16,
    color: colors.white,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  note: {
    marginVertical: 20,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 12,
    marginBottom: 20,
    color: colors.darkGray,
  },
  noteBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
  noteModalHeader: {
    marginHorizontal: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  noteModalContent: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  noteInput: {
    height: windowHeight * 0.1,
    borderColor: colors.lightGray,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveNoteBtn: {
    backgroundColor: colors.mainColor,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartModal: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: colors.mainColor,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
  },
});

export default styles;
