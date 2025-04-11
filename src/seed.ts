import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Model } from './model/entities/model.entity';
import { Variant } from './variant/entities/variant.entity';
import { Color } from './color/entities/color.entity';
import { Accessory } from './accessory/entities/accessory.entity';
import { Feature } from './feature/entities/feature.entity';
import { Category } from './category/entities/category.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  // 🔥 Clean DB
  await dataSource.synchronize(true);

  // 🏷 Create categories
  const categoryNames = [
    'Exterior',
    'Wheels',
    'Interior',
    'Safety',
    'Tech',
    'Driving Assist',
  ];
  const categoryRepo = dataSource.getRepository(Category);
  const categories: Record<string, Category> = {};
  for (const name of categoryNames) {
    const cat = categoryRepo.create({ name });
    categories[name] = await categoryRepo.save(cat);
  }

  // 🚗 Create models
  const modelRepo = dataSource.getRepository(Model);
  const modelList = [
    { name: 'Model X', image: 'https://picsum.photos/200/200' },
    { name: 'Model Y', image: 'https://picsum.photos/200/200' },
    { name: 'Model Z', image: 'https://picsum.photos/200/200' },
    { name: 'Cybertruck', image: 'https://picsum.photos/200/200' },
    { name: 'Roadster', image: 'https://picsum.photos/200/200' },
    { name: 'Model S', image: 'https://picsum.photos/200/200' },
    { name: 'Model 3', image: 'https://picsum.photos/200/200' },
    { name: 'Model A', image: 'https://picsum.photos/200/200' },
    { name: 'Model B', image: 'https://picsum.photos/200/200' },
  ];
  const models = await modelRepo.save(modelList);
  const modelA = models.find((m) => m.name === 'Model A');

  // 🧩 Setup repos
  const variantRepo = dataSource.getRepository(Variant);
  const colorRepo = dataSource.getRepository(Color);
  const accessoryRepo = dataSource.getRepository(Accessory);
  const featureRepo = dataSource.getRepository(Feature);

  // 🧬 Seed variants for Model A
  const variantsData = [
    {
      name: 'Variant A',
      image: 'https://picsum.photos/100/50',
      colors: [
        { name: 'Red', hexCode: '#FF0000', price: 10000 },
        { name: 'Blue', hexCode: '#0000FF', price: 12000 },
      ],
      accessories: [
        {
          name: 'Sunroof',
          imageUrl: 'https://picsum.photos/100/50',
          category: 'Exterior',
        },
        {
          name: 'Alloy Wheels',
          imageUrl: 'https://picsum.photos/100/50',
          category: 'Wheels',
        },
      ],
      features: [
        {
          name: 'Touchscreen Display',
          type: 'image',
          url: 'https://picsum.photos/100/50',
          category: 'Interior',
        },
        {
          name: '360 Camera',
          type: 'video',
          url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
          category: 'Safety',
        },
      ],
    },
    {
      name: 'Variant B',
      image: 'https://picsum.photos/100/50',
      colors: [
        { name: 'Green', hexCode: '#00FF00', price: 11000 },
        { name: 'Black', hexCode: '#000000', price: 13000 },
      ],
      accessories: [
        {
          name: 'Rear Camera',
          imageUrl: 'https://picsum.photos/100/50',
          category: 'Safety',
        },
        {
          name: 'Roof Rails',
          imageUrl: 'https://picsum.photos/100/50',
          category: 'Exterior',
        },
      ],
      features: [
        {
          name: 'Voice Control',
          type: 'image',
          url: 'https://picsum.photos/100/50',
          category: 'Tech',
        },
        {
          name: 'Reverse Assist',
          type: 'video',
          url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
          category: 'Driving Assist',
        },
      ],
    },
  ];

  for (const variantData of variantsData) {
    const variant = await variantRepo.save({
      name: variantData.name,
      image: variantData.image,
      model: modelA,
    });

    const colors = variantData.colors.map((c) =>
      colorRepo.create({ ...c, variant }),
    );
    await colorRepo.save(colors);

    const accessories = variantData.accessories.map((a) =>
      accessoryRepo.create({
        name: a.name,
        imageUrl: a.imageUrl,
        variant,
        category: categories[a.category],
      }),
    );
    await accessoryRepo.save(accessories);

    const featureData = variantData.features.map((f) => ({
      name: f.name,
      imageUrl: f.type === 'image' ? f.url : undefined,
      videoUrl: f.type === 'video' ? f.url : undefined,
      variant,
      category: categories[f.category],
    }));
    const features = featureRepo.create(featureData);
    await featureRepo.save(features);
    
    
  }

  console.log('✅ Seeding complete!');
  await app.close();
}

bootstrap();
