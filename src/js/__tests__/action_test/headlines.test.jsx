import * as HeadlineAction from '../../action/headlineAction';
import HeadlineStore from '../../store/HeadlineStore';


test('Function-resetHeadlines should reset headlines to an empty array',
 () => {
   expect(HeadlineAction.resetArticles).toBeInstanceOf(Function);
   HeadlineAction.resetArticles();
   const articles = HeadlineStore.articles;
   expect(articles).toHaveLength(0);
 });

