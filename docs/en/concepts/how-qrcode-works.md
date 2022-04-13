# Principle of QR Code Login

<LastUpdated/>


In summary, QR code login is essentially a process of **requesting login party** requests the **logged-in party** to write the **login credentials** to a **specific medium**. Here, the requesting login party is the web side, and the logged-in party is the APP side. The login credential can be user information or a credential in exchange for user information, and the specific medium is a QR code.

The specific QR code login process is as follows:

<img src="~@imagesZhCn/concepts/Lark20210302-193542.png" alt="drawing"/>

1. Open the login page, display a QR code, and poll the status of the QR code at the same time \(web\)
2. After opening the APP and scanning the QR code, the APP displays the confirmation and cancel buttons \(app\)
3. The login page displays the scanned user profile picture and other information \(web\)
4. The user clicks to confirm login on the APP \(app\)
5. The login page knows that the user has confirmed the login from the status of polling the QR code, and obtains the login credentials \(web\)
6. The page is successfully logged in and enters the main application page \(web\)

  
In the whole process, a specific QR code acts as a bridge between the requesting login party and the logged-in party. The QR code essentially converts a piece of text information into a picture that can be decoded and recognized through a certain agreed encoding method, and its essence is a piece of text information. Therefore, we can write the QR code ID, creation time, expiration time and other information into the QR code, and the APP terminal can recognize the QR code by decoding the QR code information (this is the basic function of the terminal media).

On the Web side, there is generally an interface for requesting QR code generation. This interface will return the QR code ID and the QR code link. The ID is used to query the latest status of the QR code and the link is used for display.

In this way, the Web and APP have established a consensus: QR code ID. The APP side can modify the QR code status through authorization, and the Web side can monitor the status change of the QR code through polling, and obtain the login credentials to complete the login.

Let's break it down in detail, the statuses of the QR code can be listed as follow:

* Not scanned
* Scanned, waiting for user confirmation
* Scanned, user agrees to the authorization
* Scanned, user cancels the authorization
* Expired


The APP can modify the status of the QR code, which will use three interfaces:

* Confirm that it has been scanned
* Agree to authorization
* Cancel authorization


Once the web terminal monitors that the QR code status has changed to **agree to authorization**, the login is complete.

When the APP side requests these interfaces, it needs to bring login credentials, and the back-end interface can determine the authorized users from this, to bind the QR code ID and the user ID.

For more information, please check the following links:
<ul>
    <li>[**Scan code login actual combat series 1: Principle and process design**](https://zhuanlan.zhihu.com/p/100026915)</li>
    <li>[**Scan code login combat series 2: Back-end interface implementation**](https://zhuanlan.zhihu.com/p/100027688)</li>
    <li>[**Scan code login actual combat series 3: Front-end SDK package**](https://zhuanlan.zhihu.com/p/100027862)</li>
    <li>[**Scan code login actual combat series 4: Summary**](https://zhuanlan.zhihu.com/p/100028054)</li>
</ul>



