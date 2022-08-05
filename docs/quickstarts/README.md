---
{
    noSidebar: true,
    quickstarts: true,
    sidebarType: 'none',
    appTypes:[
        {
            title: '客户端应用',
            description: '在手机、桌面和其他智能设备上运行的本地应用',
            icon: 'authing-yidongduan',
            link: 'quickstarts/mobileApp',
			language: [
			{'key':'ios','link':'reference/sdk-for-ios/quick.html'},
			{'key':'android','link':'reference/sdk-for-android'},
            {'key':'flutter','link':'reference/sdk-for-flutter'},
			{'key':'reactNative','link':'reference/sdk-for-react-native.html'}],
            unLanguage: []
        },
        {
            title: '单页应用',
            description: '只有单个页面的纯前端网页应用',
            icon: 'authing-danye',
            link: 'quickstarts/spa',
            language: [
			{'key':'javascript','link':'reference/guard/v2/native-javascript.html'},
			{'key':'react','link':'quickstarts/spa/react.html'},
			{'key':'vue','link':'quickstarts/spa/vue.html'},
			{'key':'angular','link':'quickstarts/spa/angular.html'}],
            unLanguage: []
        },
        {
            title: '标准 Web 应用',
            description: '多页面并支持跳转的网页应用',
            icon: 'authing-web',
            link: 'quickstarts/webApp',
			language: [	
				{'key':'nodeJsExpress','link':'quickstarts/webApp/nodeJsExpress.html'},
				{'key':'nodeJs','link':'reference/sdk-for-node/'},
				{'key':'java','link':'reference/sdk-for-java/'},
				{'key':'python','link':'reference/sdk-for-python/'},
				{'key':'cSharp','link':'quickstarts/webApp/csharpDotNetCore.html'},
				{'key':'javaSpringBoot','link':'quickstarts/webApp/javaSpringBoot.html'}],
            unLanguage: []
        },
        {
            title: '后端 / API 服务',
            description: '无前端界面，只提供后端服务的应用',
            icon: 'authing-api',
            link: 'quickstarts/apiServer',
			language: [	
				{'key':'nodeJsExpress','link':'quickstarts/apiServer/nodeJsExpress/'},
				{'key':'nodeJs','link':'reference/sdk-for-node/'},
				{'key':'java','link':'reference/sdk-for-java/'},
				{'key':'python','link':'reference/sdk-for-python/'},
				{'key':'cSharp','link':'quickstarts/apiServer/csharpDotNetCore/'}],
            unLanguage: []
        }
    ],
    languageMap: {
        ios: {
            name: 'iOS Swift',
            link: '/ios',
            img: 'ios.png',
            img2x: 'ios@2x.png'
        },
        android: {
            name: 'Android',
            link: '/android',
            img: 'android.png',
            img2x: 'android@2x.png',
        },
        flutter: {
            name: 'Flutter',
            img: 'flutter.png',
            img2x: 'flutter@2x.png',
        },
        javascript: {
            name: 'JavaScript',
            link: '/javascript.html',
            img: 'javascript.png',
            img2x: 'javascript@2x.png'
        },
        reactNative: {
            name: 'React Native',
            link: '/reactNative.html',
            img: 'react-native.svg',
            img2x: 'react-native.svg'
        },
        cSharp: {
            name: 'C Sharp',
            link: '/csharp.html',
            img: 'c-sharp.png',
            img2x: 'c-sharp@2x.png'
        },
        react: {
            name: 'React',
            link: '/react.html',
            img: 'react.png',
            img2x: 'react@2x.png'
        },
        angular: {
            name: 'Angular',
            link: '/angular.html',
            img: 'angular.png',
            img2x: 'angular@2x.png'
        },
        vue: {
            name: 'Vue',
            link: '/vue.html',
            img: 'vue.png',
            img2x: 'vue@2x.png'
        },
        python: {
            name: 'Python',
            link: '/python.html',
            img: 'python.png',
            img2x: 'python@2x.png'
        },
        nodeJs: {
            name: 'Node.js',
            link: '/node.html',
            img: 'nodejs.png',
            img2x: 'nodejs@2x.png'
        },
        nodeJsExpress: {
            name: 'Node.js Express',
            link: '/nodeJsExpress/',
            img: 'nodejs.png',
            img2x: 'nodejs@2x.png'
        },
        ruby: {
            name: 'Ruby',
            link: '/ruby.html',
            img: 'ruby.png',
            img2x: 'ruby@2x.png'
        },
        java: {
            name: 'Java',
            link: '/java.html',
            img: 'java.png',
            img2x: 'java@2x.png'
        },
        javaSpringBoot: {
            name: 'Java Spring Boot',
            link: '/javaSpringBoot.html',
            img: 'java.png',
            img2x: 'java@2x.png'
        },
        golang: {
            name: 'Golang',
            link: '/golang.html',
            img: 'golang.png',
            img2x: 'golang@2x.png'
        }
    }

}
---
