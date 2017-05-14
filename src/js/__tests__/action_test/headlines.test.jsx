import * as HeadlineAction from '../../action/headlineAction';
import HeadlineStore from '../../store/HeadlineStore';


test('Function-resetHeadlines should reset headlines to an empty array',
 () => {
   expect(HeadlineAction.resetHeadlines).toBeInstanceOf(Function);
   HeadlineAction.resetHeadlines();
   const headlines = HeadlineStore.headlines;
   expect(headlines).toHaveLength(0);
 });

