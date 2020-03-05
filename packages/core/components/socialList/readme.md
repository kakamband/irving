Component for displaying an array of `<SocialItem />` components or..really any array of components within a `<ul>`.

```js
import SocialItem from '../socialItem';

<SocialList>
    <SocialItem
        type="facebook"
        url="facebook.com/irving"
        displayIcon={true}
    />
    <SocialItem
        type="twitter"
        url="twitter.com/irving"
        displayIcon={true}
    />
    <SocialItem
        type="linkedin"
        url="linkedin.com/irving"
        displayIcon={true}
    />
    <SocialItem
        type="pinterest"
        url="pinterest.com/irving"
        displayIcon={true}
    />
    <SocialItem
        type="whatsapp"
        url="whatsapp.com/irving"
        displayIcon={true}
    />
</SocialList>
```