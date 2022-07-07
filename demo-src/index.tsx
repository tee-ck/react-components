import React from "react";
import ReactDOM from "react-dom/client";
import {Button, ButtonVariant, Input, Loading, Modal, Card, Drawer, Pagination, Dropdown, Divider, NumberDevice, RTEditor, Group, CountDown} from "../src";

import "./index.scss";
import Slider from "../src/components/Slider";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const target = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

function Demo() {
    const [screenLoading, setScreenLoading] = React.useState<boolean>(false);
    const [numberDeviceOpen, setNumberDeviceOpen] = React.useState<boolean>(false);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [drawerPosition, setDrawerPosition] = React.useState<"left" | "right" | "top" | "bottom">("left");
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    const [progress, setProgress] = React.useState<number>(0);

    const [buttonOutlined, setButtonOutlined] = React.useState<boolean>(false);

    const [inputReadOnly, setInputReadOnly] = React.useState<boolean>(false);
    const [inputDisabled, setInputDisabled] = React.useState<boolean>(false);

    const handleToggleScreenLoading = (loading: boolean) => {
        setScreenLoading(loading);

        if (loading) {
            setTimeout(() => setScreenLoading(false), 3000);
        }
    };

    React.useEffect(() => {
        setInterval(() => {
            setProgress(progress => {
                if (progress === 100) {
                    return 0;
                }

                return Math.min(progress + Math.random() * 3, 100);
            });

        }, 400);

    }, []);

    return (
        <div style={{padding: 5}}>
            <Modal open={numberDeviceOpen} style={{margin: "auto"}} toggle={() => setNumberDeviceOpen(false)}>
                <Modal.Body>
                    <NumberDevice size={"xxl"} currency={"RM"}/>
                </Modal.Body>
            </Modal>
            <Modal open={modalOpen} className={"xs-11 sm-8"} style={{margin: "auto"}} toggle={() => setModalOpen(false)}>
                <Modal.Header>
                    Modal Header
                </Modal.Header>
                <Modal.Body>
                    Modal Body
                </Modal.Body>
                <Modal.Footer>
                    <Button>Click me</Button>
                </Modal.Footer>
            </Modal>
            <Drawer open={drawerOpen} position={drawerPosition} toggle={() => setDrawerOpen(false)}>
                <div style={{width: 200, height: 200}}>Hello, World!</div>
            </Drawer>
            <Loading.Screen loading={screenLoading}/>

            <Card style={{marginTop: 10}}>
                <Card.Header>Special Components</Card.Header>
                <Card.Body style={{flexDirection: "column"}}>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>screen loading</div>
                            <Input.Switch checked={screenLoading} onChange={handleToggleScreenLoading}/>
                        </div>

                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>modal</div>
                            <Input.Switch checked={modalOpen} onChange={setModalOpen}/>
                        </div>

                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>number device</div>
                            <Input.Switch checked={numberDeviceOpen} onChange={setNumberDeviceOpen}/>
                        </div>

                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>drawer</div>
                            <Input.Switch checked={drawerOpen} onChange={setDrawerOpen}/>
                            <Dropdown style={{minWidth: 100, marginLeft: 5}}>
                                <Dropdown.Item caret>{drawerPosition}</Dropdown.Item>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setDrawerPosition("left")}>left</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setDrawerPosition("right")}>right</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setDrawerPosition("top")}>top</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setDrawerPosition("bottom")}>bottom</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <Divider/>
                    <div style={{margin: 5}}><Loading.Progress percentage={progress}/></div>
                    <Pagination pages={1000} index={1} siblings={2} style={{margin: 5}}/>
                </Card.Body>
            </Card>

            <Card style={{marginTop: 10}}>
                <Card.Header>Dev Components</Card.Header>
                <Card.Body>
                    <CountDown destination={"2022-7-11 8:00"}>
                        {([days, hours, minutes, seconds]) => {
                            return [days * 24 + hours, minutes, seconds].map(n => n < 10 ? `0${n}` : n).join(":");
                        }}
                    </CountDown>
                </Card.Body>
            </Card>

            <Card style={{marginTop: 10}}>
                <Card.Header>Button Components</Card.Header>
                <Card.Body>
                    <div>
                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>outlined</div>
                            <Input.CheckBox checked={buttonOutlined} onChange={setButtonOutlined}/>
                        </div>
                    </div>
                    {(["primary", "secondary", "success", "warning", "danger", "info"] as ButtonVariant[]).map(variant => (
                        <Button outlined={buttonOutlined} key={variant} variant={variant} style={{margin: 5}}>{variant}</Button>
                    ))}

                    <Group style={{margin: 5, flexWrap: "wrap"}}>
                        <Button outlined={buttonOutlined} className={"xs-12 sm-6 md-3"} variant="primary">Primary</Button>
                        <Button outlined={buttonOutlined} className={"xs-12 sm-6 md-3"} variant="secondary">Secondary</Button>
                        <Button outlined={buttonOutlined} className={"xs-12 sm-6 md-3"} variant="success">Success</Button>
                        <Button outlined={buttonOutlined} className={"xs-12 sm-6 md-3"} variant="danger">Danger</Button>
                    </Group>
                </Card.Body>
            </Card>

            <Card style={{marginTop: 10}}>
                <Card.Header>Input Components</Card.Header>
                <Card.Body>
                    <div style={{display: "flex"}}>
                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>readonly</div>
                            <Input.CheckBox checked={inputReadOnly} onChange={setInputReadOnly}/>
                        </div>
                        <div style={{display: "inline-flex", alignItems: "center", border: "1px solid lightgrey", borderRadius: ".25rem", padding: 5, margin: 5}}>
                            <div style={{padding: "0 5px"}}>disabled</div>
                            <Input.CheckBox checked={inputDisabled} onChange={setInputDisabled}/>
                        </div>
                    </div>
                    <Slider style={{margin: 5}} min={0} max={100} value={0} step={2}/>
                    <Input readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}}/>
                    <Input.Textarea readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}} rows={3}/>

                    <div style={{display: "flex", alignItems: "center"}}>
                        <Input.Switch readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}}/>
                        <Input.CheckBox readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}}/>
                    </div>
                    <Input.Search readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}}/>
                    <Input.Number readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}}/>
                    <Input.Number readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}} currency="RM"/>
                    <Dropdown readOnly={inputReadOnly} disabled={inputDisabled} style={{margin: 5}}>
                        <Dropdown.Item caret>Item 1</Dropdown.Item>

                        <Dropdown.Menu>
                            <Dropdown.Item>Item 1</Dropdown.Item>
                            <Dropdown.Item>Item 2</Dropdown.Item>
                            <Dropdown.Item>Item 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
        </div>
    );
}

const EditorPage = () => {

    const handleChange = (content: string) => {


    };

    return (
        <div style={{padding: 5}}>
            <RTEditor onChange={handleChange}/>
        </div>
    )
};

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/editor" element={<EditorPage/>}/>
                <Route path="*" element={<Demo/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);