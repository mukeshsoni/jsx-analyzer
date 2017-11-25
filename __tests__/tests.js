import { getPropsFromJsxCode } from '../index.js'
import * as babylon from 'babylon'

describe('asd', () => {
    it('should get jsx string literal prop value', () => {
        let jsxCode = '<div name="someone" ></div>'
        let expectedProps = {
            name: 'someone'
        }

        expect(getPropsFromJsxCode(jsxCode)).toEqual(expectedProps)
    })

    it('should get jsx numeric literal prop value', () => {
        let jsxCode = '<div name="someone" age={1} ></div>'
        let expectedProps = {
            name: 'someone',
            age: 1
        }

        expect(getPropsFromJsxCode(jsxCode)).toEqual(expectedProps)
    })

    it('should get jsx object prop value', () => {
        let jsxCode =
            '<div name="someone" age={1} address={{street: "kodihalli", city: "bangalore", pincode: 570000 }}></div>'
        let expectedProps = {
            name: 'someone',
            age: 1,
            address: {
                street: 'kodihalli',
                city: 'bangalore',
                pincode: 570000
            }
        }

        expect(getPropsFromJsxCode(jsxCode)).toEqual(expectedProps)
    })

    it('should get jsx nested object prop value', () => {
        let jsxCode =
            '<div name="someone" age={1} address={{street: "kodihalli", city: "bangalore", pincode: 570000, country: {name: "india", code: "+91"}}}></div>'
        let expectedProps = {
            name: 'someone',
            age: 1,
            address: {
                street: 'kodihalli',
                city: 'bangalore',
                pincode: 570000,
                country: {
                    name: 'india',
                    code: '+91'
                }
            }
        }

        expect(getPropsFromJsxCode(jsxCode)).toEqual(expectedProps)
    })

    it('should get jsx array prop value', () => {
        let jsxCode =
            '<div name="someone" age={1} address={{street: "kodihalli", city: "bangalore", pincode: 570000 }} repos={[{url: "github/1", name: "repo1"},{url: "github/2", name: "repo2"},]}></div>'
        let expectedProps = {
            name: 'someone',
            age: 1,
            address: {
                street: 'kodihalli',
                city: 'bangalore',
                pincode: 570000
            },
            repos: [
                {
                    url: 'github/1',
                    name: 'repo1'
                },
                {
                    url: 'github/2',
                    name: 'repo2'
                }
            ]
        }

        expect(getPropsFromJsxCode(jsxCode)).toEqual(expectedProps)
    })

    describe('function props', () => {
        it('should get jsx function prop value', () => {
            let jsxCode =
                '<div name="someone" onClick={function(event, index) {console.log("clicked")}}></div>'
            let expectedProps = {
                name: 'someone',
                onClick: function(event, index) {
                    console.log('clicked')
                }
            }
            let expectedOnClickString = new Function(
                'event',
                'index',
                'console.log("clicked")'
            ).toString()

            let props = getPropsFromJsxCode(jsxCode)
            expect(props.name).toEqual(expectedProps.name)
            expect(typeof props.onClick).toBe('function')
            expect(props.onClick.length).toBe(2)
            expect(props.onClick.toString()).toEqual(expectedOnClickString)
        })

        it('should get jsx function prop value with function call statement with multi arguments', () => {
            let jsxCode =
                '<div name="someone" onClick={function(event, index) {console.log("clicked", 1, index)}}></div>'
            let expectedProps = {
                name: 'someone',
                onClick: function(event, index) {
                    console.log('clicked')
                }
            }
            let expectedOnClickString = new Function(
                'event',
                'index',
                'console.log("clicked", 1, index)'
            ).toString()

            let props = getPropsFromJsxCode(jsxCode)
            expect(props.name).toEqual(expectedProps.name)
            expect(typeof props.onClick).toBe('function')
            expect(props.onClick.length).toBe(2)
            expect(props.onClick.toString()).toEqual(expectedOnClickString)
        })

        it('should get jsx function prop value with a return statement', () => {
            let jsxCode =
                '<div name="someone" onClick={function(event, index) {console.log("clicked", 1, index); return 2;}}></div>'
            let expectedProps = {
                name: 'someone',
                onClick: function(event, index) {
                    console.log('clicked')
                }
            }
            let expectedOnClickString = new Function(
                'event',
                'index',
                'console.log("clicked", 1, index);\nreturn 2'
            ).toString()

            let props = getPropsFromJsxCode(jsxCode)
            expect(props.name).toEqual(expectedProps.name)
            expect(typeof props.onClick).toBe('function')
            expect(props.onClick.length).toBe(2)
            expect(props.onClick.toString()).toEqual(expectedOnClickString)
        })
    })
})
