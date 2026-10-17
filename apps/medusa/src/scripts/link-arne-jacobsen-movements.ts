import {
  ContainerRegistrationKeys,
  MedusaError,
} from '@medusajs/framework/utils';
import type { ExecArgs } from '@medusajs/framework/types';
import { MOVEMENT_MODULE } from '../modules/movement';
import { DESIGNER_MODULE } from '../modules/designer';
import type MovementModuleService from '../modules/movement/service';
import type DesignerModuleService from '../modules/designer/service';

const NEW_MOVEMENTS = [
  {
    slug: 'modernism',
    name: 'Modernism',
    description:
      "Since the early twentieth century, modernism has brought together architectural and design movements that break with historical ornamentation in favour of clean forms, industrial materials, and a function clearly expressed through form.",
  },
  {
    slug: 'functionalism',
    name: 'Functionalism',
    description:
      "Functionalism holds that an object's form should above all follow from its use. Born in the wake of the Bauhaus, this movement guided generations of designers toward a restrained aesthetic, stripped of anything superfluous.",
  },
  {
    slug: 'danish-modern',
    name: 'Danish Modern',
    description:
      "Danish Modern refers to the Danish school of design from the mid-twentieth century: woodworking craftsmanship, soft lines, and a constant concern for comfort, championed by figures such as Arne Jacobsen and Hans J. Wegner.",
  },
];

const RENAMES: Record<string, string> = {
  'organic-design': 'Organic Design',
  'mid-century': 'Mid-century Modern',
};

const TARGET_SLUGS = [
  'modernism',
  'functionalism',
  'danish-modern',
  'organic-design',
  'mid-century',
];

export default async function linkArneJacobsenMovements({
  container,
}: ExecArgs) {
  const movementModuleService: MovementModuleService =
    container.resolve(MOVEMENT_MODULE);
  const designerModuleService: DesignerModuleService =
    container.resolve(DESIGNER_MODULE);
  const link = container.resolve(ContainerRegistrationKeys.LINK);

  const [designer] = await designerModuleService.listDesigners({
    slug: 'arne-jacobsen',
  });
  if (!designer) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      'Expected the arne-jacobsen designer to exist',
    );
  }

  const [oldMovement] = await movementModuleService.listMovements({
    slug: 'scandinavian-modern',
  });
  if (oldMovement) {
    await link.dismiss({
      [MOVEMENT_MODULE]: { movement_id: oldMovement.id },
      [DESIGNER_MODULE]: { designer_id: designer.id },
    });
    await movementModuleService.deleteMovements([oldMovement.id]);
    console.log(
      `Deleted movement ${oldMovement.slug} and its link to ${designer.slug}`,
    );
  }

  for (const [slug, name] of Object.entries(RENAMES)) {
    const [movement] = await movementModuleService.listMovements({ slug });
    if (!movement) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Expected the ${slug} movement to exist`,
      );
    }
    await movementModuleService.updateMovements({ id: movement.id, name });
    console.log(`Renamed movement ${slug} to "${name}"`);
  }

  for (const input of NEW_MOVEMENTS) {
    const [existing] = await movementModuleService.listMovements({
      slug: input.slug,
    });
    if (existing) continue;
    await movementModuleService.createMovements(input);
    console.log(`Created movement ${input.slug}`);
  }

  const targetMovements = await movementModuleService.listMovements({
    slug: TARGET_SLUGS,
  });

  await link.create(
    targetMovements.map((movement) => ({
      [MOVEMENT_MODULE]: { movement_id: movement.id },
      [DESIGNER_MODULE]: { designer_id: designer.id },
    })),
  );

  console.log(
    `Linked ${designer.slug} to: ${targetMovements.map((m) => m.slug).join(', ')}`,
  );
}
