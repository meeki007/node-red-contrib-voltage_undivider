node-red-contrib-voltage_undivider
==================================


<a href="http://nodered.org" target="_new">Node-RED</a> A Node to un-divide a voltage that was divided prior to taking a reading to protect a input when reading its value.

---

## Table of Contents
* [Install](#install)
* [Usage](#usage)
  * [Voltage_In](#Voltage_In)
  * [Resistor_1](#Resistor_1)
  * [Resistor_2](#Resistor_2)
  * [Voltage_Out](#Voltage_Out)
  * [Round_Output](#Round_Output)
* [Example Flows](#example-flows)
  * [Example](#example)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)
* [Work](#work)
* [Contributor of Project](#contributor)

---

## Install

Install with node-red Palette Manager or,

Run the following command in your Node-RED user directory - typically `~/.node-red`:

```
npm install node-red-contrib-voltage_undivider
```


## Usage

A Node to un-divide a voltage that was divided prior to taking a reading to protect a input when reading its value.
Just insert the node in between two others. Then the voltage received can be corrected, undivided, to show voltage before the physical voltage devider.

Be sure to send the voltage as msg.payload. After the voltage_undivider does its work the output will also be sent via msg.payload

![examplenode.png](./doc/examplenode.png)


### Voltage_In

Select the voltage scale for the Input. Voltages from diffrent sources may be represented in diffrent scales. Example; a ADC (Anolog to Digital Converter may output in mV. You must select the correct input voltage scale or your output will be wrong.

### Resistor_1

![vdivider.png](./doc/vdivider.png)

Select the resistor scale for the resistor used. Then enter the resistance.

### Resistor_2

![vdivider.png](./doc/vdivider.png)

Select the resistor scale for the resistor used. Then enter the resistance.

### Voltage_Out

Select the voltage scale you want for the Output. If you have selected the correct scale on the input the output scale you have selected will be automaticly converted to the voltage you want.

### Round_Output

If you would like your output to be rounded then select the level you want. Note: if you choose not to round the maximum integer length is 15 digits. The maximum length after a decimals is 17 digits. 

## Example Flows

Simple examples showing how to use the voltage_undivider.


### Example

![example1.png](./doc/example1.png)

```JSON
[{"id":"6c3f0ba9.131de4","type":"change","z":"7edb64d7.2216cc","name":"Anolog Digital Converter","rules":[{"t":"set","p":"payload","pt":"msg","to":"3.25","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":310,"y":320,"wires":[["5ad1bd27.e1b3b4"]]},{"id":"c0a340e7.a8288","type":"debug","z":"7edb64d7.2216cc","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":710,"y":320,"wires":[]},{"id":"1782d03a.4e4ae","type":"inject","z":"7edb64d7.2216cc","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":120,"y":320,"wires":[["6c3f0ba9.131de4"]]},{"id":"5ad1bd27.e1b3b4","type":"voltage_undivider","z":"7edb64d7.2216cc","name":"","Voltage_Input":"V-Volts","Resistor_1":"1.1","Resistor_1Types":"Ω-Ohm","Resistor_2":"2.1","Resistor_2Types":"Ω-Ohm","Voltage_Output":"V-Volts","Round_Output":"Thousandths","x":530,"y":320,"wires":[["c0a340e7.a8288"]]}]
```

## Bugs / Feature request
Please [report](https://github.com/meeki007/node-red-contrib-voltage_undivider/issues) bugs and feel free to [ask](https://github.com/meeki007/node-red-contrib-voltage_undivider/issues) for new features directly on GitHub.


## License
This project is licensed under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) license.


## Work
_Need a node?
_Need automation work?
_Need computers to flip switches?
  
Contact me at meeki007@gmail.com


## Contributor of Project

Thanks to [SunValleyFoods](https://www.sunvalleyfoods.com/) for being a buisness that supports opensource. They needed this node for a monitoring and automation project for their equipment.

## release notes ##
0.0.0 = (majorchange) . (new_feature) . (bugfix-simple_mod)

version 0.7.8
updated help txt
updated images
updated example code

version 0.7.7
fixed install command


version 0.7.6
First Public release



