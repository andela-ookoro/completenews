import HeadlineStore from '../../store/HeadlineStore';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';

const articles = [
  {
    title: 'Love is real',
    description: 'Love has been with man kind from the beginning.',
  },
  {
    id: 'Champions league update',
    description: 'Real Madrid qualitfy for champions league semi-finals',
  },
];
const source = 'Real word';

test('HeadlineStore should be intiated with empty values', () => {
  expect(HeadlineStore.articles).toHaveLength(0);
  expect(HeadlineStore.error).toBe('');
});

test('Function "getHeadline" that update the headlines property', () => {
  expect(HeadlineStore.setArticles).toBeInstanceOf(Function);
  HeadlineStore.setArticles(articles);
  expect(HeadlineStore.articles).toBe(articles);
});

test('Function "displayError" that update the "error" property', () => {
  expect(HeadlineStore.setError).toBeInstanceOf(Function);
  const error = 'no internet';
  HeadlineStore.setError(error);
  expect(HeadlineStore.error).toBe(error);
});

test('Store should listen to "GetHeadline" event', () => {
  Dispatcher.dispatch({
    Type: Constant.GET_ARTICLE,
    articles,
    source
  });
  expect(HeadlineStore.articles).toEqual(articles);
});

test('Store should listen to "GetHeadlinesError" event', () => {
  const error = 'no internet';
  Dispatcher.dispatch({
    Type: Constant.GetHeadlinesError,
    err: error,
  });
  expect(HeadlineStore.error).toBe(error);
});



