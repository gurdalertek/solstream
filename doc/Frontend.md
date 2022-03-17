![Logo](./img/logo.png) 

## Frontend

This section describes each screen of SOLSTREAM.

The full set of technologies/tools used in the frontend are described in the [Technology/Tool Stack](TechnologyStack.md) section.

For the user interface (UI), the [Hulu's](https://www.hulu.com/welcome) UI was adopted, following the steps in  [this tutorial]([Hulu UI](https://www.youtube.com/watch?v=MqDlsjc8GLo). Other alternative interfaces can be adopted and/or developed, such as the [Playstation UI](https://www.youtube.com/results?search_query=playstation+clone+with+react). Users can be charged a small fee to be able to user their favorite interface.


### Home Page
This is the "HOME" page for SOLSTREAM. There is readily a carefully-curated collection of videos in SOLSTREAM, under four initial channels (categories) of Cities, Nature, Culture, and Crypto.

![Screen01](./img/Screen01.png)

### Playing Videos
Viewers can view videos without being connected to Solana (as can be told from the "Connect Phantom Wallet" button on the top right). Here, the user is clicking the "Paris" video.

![Screen02](./img/Screen02.png)

### Displayed Ads
Ads (advertisements) are displayed while the videos are running. Only ads targeted to that channel (ex: Cities) are being shown for the videos of a channel. In the future, ads can be placed on videos optimally, so that they are most related to a video.

![Screen03](./img/Screen03.png)

### Connecting Wallet
By clicking "Connect Phantom Wallet", users can sign-in through the [Phantom Wallet](https://phantom.app/) add-in of Chrome (a non-custodial hot wallet / browser extension), to enter the backstage of SOLSTREAM, the Decentralized Autonomous Organization (DAO), most of which is yet to be implemented. The blockchain accessed by SOLSTREAM is Solana.

![Screen04](./img/Screen04.png)

### Approving Signature
In order for SOLSTREAM to interact with the Solana blockchain, the the signature request must be approved withint the [Phantom Wallet](https://phantom.app/). 

![Screen05](./img/Screen05.png)

### Changing Settings
There are some settings that need to be changed for the current implementation of SOLSTREAM.

![Screen06](./img/Screen06.png)

### Change Network
"Change Network" button must be clicked under "Settings" of the Phantom wallet.

![Screen07](./img/Screen07.png)

### Changing Network to DevNet
The network should be changed to "DevNet" for the current implementation of SOLSTREAM.

![Screen08](./img/Screen08.png)

### Upload Function
Members of the DAO can upload videos and advertisements by clicking the "UPLOAD" button on the top.

![Screen09](./img/Screen09.png)

### Uploading Video
Videos can be uploaded by specifying the required information. The uploaded video files will reside on the [IPFS](https://ipfs.io/) and detailed data about each video will reside under [Moralis](https://moralis.io).

![Screen10](./img/Screen10.png)

### Uploading Ads
Ads can be uploaded by specifying the required information. The text for the uploaded ads will reside under [Moralis](https://moralis.io).

![Screen11](./img/Screen11.png)

### Viewing Ads
The ads uploaded to Solstream can be viewed by clicking the "ADS" button.

![Screen12](./img/Screen12.png)

### Viewing Ads - Collection
The ads uploaded to Solstream are displayed, so that the user (with Governor role) can vote on them. Voting is not yet implemented.

![Screen13](./img/Screen13.png)

### Account Information
Account information can be viewed by clicking the "ACCOUNT" button.

![Screen14](./img/Screen14.png)

### Viewing Account Information
The account information displayed include User Address (shown only after the issuance of Governor token), Votes, Governance token details, and total available supply of governence tokens left.

![Screen15](./img/Screen15.png)

### Minting Governance Token
Governance token can be minted from this screen by clicking the "Mint Token" button at the bottom.

![Screen16](./img/Screen16.png)

### Viewing the Minted Token through Phantom
Once the governance token is minted/issued, the user can view the minted token through Phantom. For this, the user (Governor) must first open Phantom, as shown next.

![Screen17](./img/Screen17.png)


### Minted Governance Token
As can be seen in the following screenshot, the minted governance token is displayed in the Phantom wallet. As mentioned earlier, in the current implementation of SOLSTREAM, the implementation is for Solana DevNet, so the token is available only in the Solana DevNet.

![Screen18](./img/Screen18.png)

### Details of the Governance Token
As can be seen in the following screenshot, the details of the minted governance token can be viewed. Here, the user is clicking the latest activity, which was the minting of the Governance token for this user/wallet.

![Screen19](./img/Screen19.png)

### Transaction Details 
Transaction details for a selected activity can be found under [Solscan block explorer](https://solscan.io).

![Screen20](./img/Screen20.png)

**Index**

1. [Background](Background.md)
2. [Unique Value Offerings](UniqueValueOfferings.md)
3. [Design Principles](DesignPrinciples.md)
4. [System Architecture](SystemArchitecture.md)
5. [Backend](Backend.md)
6. **Frontend**
7. [Technology/Tool Stack](TechnologyStack.md)
8. [Related Projects](RelatedProjects.md)
9. [Other Resources](OtherResources.md)
10. [Future Plans](FuturePlans.md)

<hline></hline>

[Back to Main GitHub Page](../README.md) | [Back to Documentation Index Page](Documentation.md)
