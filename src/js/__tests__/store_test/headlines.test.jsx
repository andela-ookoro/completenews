import HeadlineStore from '../../store/HeadlineStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';

const headlines = [
  {
    title: 'Love is real',
    description: 'Love has been with man kind from the beginning.',
  },
  {
    id: 'Champions league update',
    description: 'Real Madrid qualitfy for champions league semi-finals',
  },
];

test('HeadlineStore should be intiated with empty values', () => {
  expect(HeadlineStore.headlines).toHaveLength(0);
  expect(HeadlineStore.error).toBe('');
});

test('Function "getHeadline" that update the headlines property', () => {
  expect(HeadlineStore.getHeadlines).toBeInstanceOf(Function);
  HeadlineStore.getHeadlines(headlines);
  expect(HeadlineStore.headlines).toBe(headlines);
});

test('Function "displayError" that update the "error" property', () => {
  expect(HeadlineStore.displayError).toBeInstanceOf(Function);
  const error = 'no internet';
  HeadlineStore.displayError(error);
  expect(HeadlineStore.error).toBe(error);
});

test('Store should listen to "GetHeadline" event', () => {
  Dispatcher.dispatch({
    Type: Constant.GetHeadline,
    headlines,
  });
  expect(HeadlineStore.headlines).toEqual(headlines);
});

test('Store should listen to "GetHeadlinesError" event', () => {
  const error = 'no internet';
  Dispatcher.dispatch({
    Type: Constant.GetHeadlinesError,
    err: error,
  });
  expect(HeadlineStore.error).toBe(error);
});

test('Store should listen to "GetDBHeadlines" event', () => {

  Dispatcher.dispatch({
    Type: Constant.GetDBHeadlines,
    headlines,
  });
  expect(HeadlineStore.headlines).toBe(headlines);
});

