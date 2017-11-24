import { getPropsFromJsxCode } from '../index.js'
import * as babylon from 'babylon'

describe('asd', () => {
    it('should get jsx string literal prop value', () => {
        let jsxCode = '<div name="someone" ></div>'
        let expectedProps = {
            name: 'someone',
            age: 1
        }

        expect(getPropsFromJsxCode(jsxCode)).toEqual({ name: 'someone' })
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
})
