---
template: article
title: The creative neural network
date: 2019-03-10T15:40:41.410Z
media_image: /img/gan_part_1_cover.jpg
ingress: >-
  The terms "machine learning" and "neural networks" are probably familiar to
  you, but have you heard of Generative Adversarial Networks, or GAN for short?
  Maybe not, as they are a quite recent development, but you may have seen
  samples of their output. The website [This Person Does Not
  Exist](https://thispersondoesnotexist.com/) (responsible for the main image of
  this post) was trending recently, and it shows the cutting edge of what GANs
  are capable of: creating people from thin air.


  This is, as you can probably tell, VERY COOL, so naturally I wanted to run
  this software myself and maybe make something useful with it. This is part 1
  of my adventures in GAN land.
tags:
  - GAN
  - machine learning
  - neural networks
author: editor@verycool.dev
pinned: 0
---
First, some very short background on myself: I am a web developer mostly doing frontend. Before experimenting with neural networks, I had basically never touched Python, which is the language de jour of the neural network world. Nevertheless I had the crazy idea of taking the code behind [This Person Does Not Exist](https://thispersondoesnotexist.com/) and making it run in Javascript or even the browser, which is a domain I know very well.

That might not be as crazy of an idea as it may first seem (although, spoiler alert: I'm probably not getting that specific GAN implementation to run in the browser), since [Google's Tensorflow](https://www.tensorflow.org/) machine learning library has a Javascript version, [Tensorflow.js](https://www.tensorflow.org/js/). So just take the pretrained model, convert it somehow, and shazam, I have a GAN in my browser! Right? Well...

But I am getting way ahead of myself. We need to back up to what a GAN actually is and how it works.

### Wut

Yeah, wut. That's what I'm thinking too. As stated, my background is in web development and not neural networks, and I suck at math, so I will only be able to provide a very high-level and potentially completely wrong description. But I will be linking to some research papers, so clicky clicky if you want to dig deeper.

My interest is purely in how I can get the code to run and how I can use the results for fun and profit, so that's what I'll talk about.

### The basics

For our purposes, a "neural network" is a magic black box that takes some input and returns some "intelligent" output. A traditional task is classifying, which consists of looking at a piece of data and determining what it is, like "lamp" or "car". It can even be as simple as true or false. The input is the data you want to classify, and the output is the label that the neural network thinks  applies to it.

Before being even remotely useful, the network has to be trained. This involves feeding it as much information as you can and telling it outright what label should apply to each piece of data. The result is a trained model that can then be used for the real work of classifying whatever you need to classify.

The training starts with random data, and as far as I know, what actually happens when training a neural network is that "weights" are adjusted in response to what the end result should be. So if the model sees an apple, and is told the output for that should be "apple", the numbers are nudged in that direction. The model is trained when it can classify what an unknown input is with acceptable reliability. A "trained model" is thus just a pile of numbers that have been arranged _just so_.

Python is usually used as the programming language when working with neural networks, and Google's Tensorflow is a popular library for implementing them. In a gross mischaracterization, think of Tensorflow as the jQuery of neural networks. If this is all new to you: I hope that helps. If you work with Tensorflow: I'M SORRY!

So far we have the trained model, which is the black box, and the code that runs it, which is the Tensorflow stuff.

### The GAN

That's all well and good for classifying stuff, but what if we want to create stuff? For that we need a GAN.

A GAN, or Generative Adversarial Network, actually consists of TWO neural networks: one that generates random images, and one that judges whether or not the images are real. They are called the Generator and the Discriminator, respectively. Let's personify them and call the generator Frank (after Frank Abagnale of Catch Me If You Can fame), and call the discriminator Tom (after Tom Hanks, the guy who played the FBI agent that chased Frank. I think the character was made up for the movie).

Frank spends his days counterfeiting images and Tom is hot on his trail trying to catch him in the act. When Tom catches Frank, he politely explains what Frank did wrong and tells him to not do it again. Frank, always up to his old tricks, is now slightly better at counterfeiting and has a better chance of fooling Tom.

This is essentially the training process. Tom is trained more like a classifier and sharpens his skill by looking at both real images and images made by Frank. Frank, however, is exclusively trained on the fake/real responses from Tom and starts off with random scribbles. Over time, both Frank and Tom get really good at what they do and the tension between these sworn enemies is what enables the GAN to produce such realistic images.

![Simple diagram of the GAN training process](/img/gans-overview.png "GAN training diagram from https://www.lyrn.ai/2018/12/26/a-style-based-generator-architecture-for-generative-adversarial-networks/")

There is a conspiracy theory that the government that employs Tom is thoroughly corrupt, since it is actually rooting for Frank to get really good at his job and the police force enjoys no support from the people in charge. Tom actually needs to be hampered in his progress as he would be too good otherwise and the GAN would not produce any output.

This is also a really good time to talk about "artificial intelligence" - or the lack of it. If this were actual intelligence, Tom would eventually figure out that everything that comes from Frank is fake, or somehow devise a test to determine which pictures are from Frank if the sender is unknown. A neural network is just code, and a computer can't do anything you haven't told it to do. As such, I won't be using the term "AI" at all.

### StyleGAN, the bleeding edge

Let's look at [This Person Does Not Exist](https://thispersondoesnotexist.com/) again. It produces high resolution images that look quite real, albeit with some weird artifacts. Some outliers are also very distorted and creepy, so I guess Tom wasn't very focused during that iteration.

The code behind TPDNE is a research project by Nvidia that they open-sourced, called [StyleGAN](https://github.com/NVlabs/stylegan). It is, as far as I can tell, the bleeding edge of what GANs are capable of. They've come a long way since 2014, when the GAN was first proposed by [Goodfellow et al](https://arxiv.org/abs/1406.2661). I'm very happy that they open-sourced StyleGAN, since that means I can run it on my machine! But more on that in later parts.

StyleGAN works by incrementally generating the image, starting with a 4x4 pixel blob. It then adds more resolution layer by layer, each layer adding finer detail to the resulting image. The lower resolution layers lay down the basic shapes and the higher resolution layers adds details like hairs and texture.  The layers can also be independent, so detail like skin color or hair style can be added to a basic pose. In this picture from the StyleGAN repo, see how each row is a different "race" while the general pose and even age is the same for the column:

![StyleGAN teaser](/img/stylegan-teaser.png "StyleGAN in action")

That is very cool if you ask me!

The StyleGAN repo contains the full code to run the neural network and they even provide pre-trained models in the Google Drive folder. Thanks Nvidia! In the next part, we'll see how we can get StyleGAN running on a local machine. I also want to look at other GAN implementations, specifically those that can be run with Tensorflow.js in the browser.

In the meantime, check out a blog post about StyleGAN I found quite interesting on [Lyrn.ai](https://www.lyrn.ai/2018/12/26/a-style-based-generator-architecture-for-generative-adversarial-networks/).

See you in the next part!
